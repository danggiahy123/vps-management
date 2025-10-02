'use client';

import React, { useState } from 'react';
import { 
  ServerIcon, 
  PlayIcon, 
  StopIcon, 
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { mockVMs } from '../../data/mockData';

export default function VPSPage() {
  const [vms, setVMs] = useState(mockVMs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVMs = vms.filter(vm => {
    const matchesSearch = vm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vm.ip.includes(searchTerm) ||
                         vm.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'running':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'stopped':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'starting':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'stopping':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleVMAction = (vmId: string, action: string) => {
    setVMs(vms.map(vm => {
      if (vm.id === vmId) {
        let newStatus = vm.status;
        switch (action) {
          case 'start':
            newStatus = 'running';
            break;
          case 'stop':
            newStatus = 'stopped';
            break;
          case 'restart':
            newStatus = 'running';
            break;
        }
        return { ...vm, status: newStatus };
      }
      return vm;
    }));
    
    // Show success message
    alert(`VM ${action} action completed successfully!`);
  };

  const getActionButton = (vm: any) => {
    if (vm.status === 'running') {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => handleVMAction(vm.id, 'stop')}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
          >
            <StopIcon className="h-3 w-3 mr-1" />
            Stop
          </button>
          <button
            onClick={() => handleVMAction(vm.id, 'restart')}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-orange-600 hover:bg-orange-700"
          >
            <ArrowPathIcon className="h-3 w-3 mr-1" />
            Restart
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => handleVMAction(vm.id, 'start')}
          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
        >
          <PlayIcon className="h-3 w-3 mr-1" />
          Start
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VPS Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your virtual private servers
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create VPS
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
                  placeholder="Search VPS by name, IP, or owner..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="running">Running</option>
                <option value="stopped">Stopped</option>
                <option value="starting">Starting</option>
                <option value="stopping">Stopping</option>
              </select>
            </div>
          </div>
        </div>

        {/* VPS Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVMs.map((vm) => (
            <div key={vm.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ServerIcon className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{vm.name}</h3>
                      <p className="text-sm text-gray-500">{vm.ip}</p>
                    </div>
                  </div>
                  <span className={getStatusBadge(vm.status)}>
                    {vm.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Owner:</span>
                    <span className="text-gray-900">{vm.ownerName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">OS:</span>
                    <span className="text-gray-900">{vm.os}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CPU Usage:</span>
                    <span className="text-gray-900">{vm.cpu}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">RAM Usage:</span>
                    <span className="text-gray-900">{vm.ram}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Disk Usage:</span>
                    <span className="text-gray-900">{vm.disk}%</span>
                  </div>
                </div>

                {/* Resource Usage Bars */}
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>CPU</span>
                      <span>{vm.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${vm.cpu}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>RAM</span>
                      <span>{vm.ram}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${vm.ram}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Disk</span>
                      <span>{vm.disk}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${vm.disk}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between items-center">
                  <button className="text-sm text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                  {getActionButton(vm)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVMs.length === 0 && (
          <div className="text-center py-12">
            <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No VPS found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating a new VPS server.'
              }
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create VPS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
