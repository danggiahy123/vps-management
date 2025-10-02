'use client';

import React, { useState } from 'react';
import { 
  ExclamationTriangleIcon, 
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { mockAlerts, mockLogs } from '../../data/mockData';

export default function AlertsLogsPage() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.vmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'acknowledged':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'resolved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'dismissed':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <ExclamationCircleIcon className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return <InformationCircleIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAlertAction = (alertId: string, action: string) => {
    setAlerts(alerts.map(alert => {
      if (alert.id === alertId) {
        let newStatus = alert.status;
        switch (action) {
          case 'acknowledge':
            newStatus = 'acknowledged';
            break;
          case 'resolve':
            newStatus = 'resolved';
            break;
          case 'dismiss':
            newStatus = 'dismissed';
            break;
        }
        return { ...alert, status: newStatus };
      }
      return alert;
    }));
    
    alert(`Alert ${action} action completed successfully!`);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const exportToCSV = () => {
    const data = activeTab === 'alerts' ? filteredAlerts : mockLogs;
    const headers = activeTab === 'alerts' 
      ? ['ID', 'Title', 'Type', 'Status', 'VM', 'User', 'Created At']
      : ['ID', 'User', 'Action', 'Description', 'Status', 'Timestamp'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => {
        if (activeTab === 'alerts') {
          return [
            item.id,
            `"${item.title}"`,
            item.type,
            item.status,
            item.vmName,
            item.userName,
            formatTime(item.createdAt)
          ].join(',');
        } else {
          return [
            item.id,
            item.userName,
            item.action,
            `"${item.description}"`,
            item.status,
            formatTime(item.timestamp)
          ].join(',');
        }
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}-export.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Alerts & Logs</h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor system alerts and activity logs
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('alerts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'alerts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Alerts ({filteredAlerts.length})
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'logs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activity Logs ({mockLogs.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {activeTab === 'alerts' && (
              <select 
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'alerts' ? (
          /* Alerts Table */
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredAlerts.map((alert) => (
                <li key={alert.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                              {alert.title}
                            </p>
                            <span className="ml-2">{getStatusBadge(alert.status)}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {alert.message}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <span>VM: {alert.vmName}</span>
                            <span className="mx-2">•</span>
                            <span>User: {alert.userName}</span>
                            <span className="mx-2">•</span>
                            <span>{formatTime(alert.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {alert.status === 'active' && (
                          <>
                            <button
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                              className="text-xs px-3 py-1 border border-yellow-300 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded"
                            >
                              Acknowledge
                            </button>
                            <button
                              onClick={() => handleAlertAction(alert.id, 'resolve')}
                              className="text-xs px-3 py-1 border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 rounded"
                            >
                              Resolve
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleAlertAction(alert.id, 'dismiss')}
                          className="text-xs px-3 py-1 border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Logs Table */
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Activity Logs
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Recent system activity and user actions
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {mockLogs.map((log) => (
                <li key={log.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getLogStatusIcon(log.status)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                              {log.userName}
                            </p>
                            <span className="ml-2 text-xs text-gray-500">
                              {log.action.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {log.description}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <span>{formatTime(log.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.status === 'success' 
                          ? 'bg-green-100 text-green-800'
                          : log.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
