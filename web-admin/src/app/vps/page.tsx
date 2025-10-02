'use client';

import React, { useState } from 'react';
import { 
  ServerIcon, 
  PlayIcon, 
  StopIcon, 
  ArrowPathIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { mockVMs } from '../../data/mockData';

export default function VPSPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVMs, setSelectedVMs] = useState<string[]>([]);

  const filteredVMs = mockVMs.filter(vm => {
    const matchesSearch = vm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vm.ip.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || vm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectVM = (vmId: string) => {
    setSelectedVMs(prev => 
      prev.includes(vmId) 
        ? prev.filter(id => id !== vmId)
        : [...prev, vmId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVMs.length === filteredVMs.length) {
      setSelectedVMs([]);
    } else {
      setSelectedVMs(filteredVMs.map(vm => vm.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'stopped':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'starting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'stopping':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'stopped':
        return <XCircleIcon className="h-4 w-4" />;
      case 'starting':
      case 'stopping':
        return <ClockIcon className="h-4 w-4" />;
      default:
        return <ServerIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                VPS Management
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Manage your virtual private servers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create VPS
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search VPS by name or IP..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm appearance-none"
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

            {/* Bulk Actions */}
            {selectedVMs.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedVMs.length} selected
                </span>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Start All
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Stop All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VPS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVMs.map((vm) => (
            <div 
              key={vm.id} 
              className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                selectedVMs.includes(vm.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleSelectVM(vm.id)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedVMs.includes(vm.id)}
                    onChange={() => handleSelectVM(vm.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ServerIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* VM Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{vm.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{vm.ip}</p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(vm.status)}`}>
                  {getStatusIcon(vm.status)}
                  <span className="ml-1 capitalize">{vm.status}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{vm.cpu}%</div>
                  <div className="text-xs text-gray-500">CPU Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{vm.ram}%</div>
                  <div className="text-xs text-gray-500">RAM Usage</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2 mb-6">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>CPU</span>
                    <span>{vm.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vm.cpu}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>RAM</span>
                    <span>{vm.ram}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vm.ram}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PlayIcon className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StopIcon className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
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
                : 'Get started by creating your first VPS.'
              }
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create VPS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}