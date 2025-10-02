'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl border-b border-blue-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-blue-800 rounded-lg transition-all duration-200 hover:scale-105">
            <span className="text-xl">☰</span>
          </button>
          
          <button className="flex items-center px-4 py-2 bg-blue-800 hover:bg-blue-900 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
            <span className="mr-2">❓</span>
            Hỗ trợ
          </button>
          
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
            <span className="mr-2">➕</span>
            Tạo mới dịch vụ
            <span className="ml-2">▼</span>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          <div className="text-sm bg-blue-800 px-3 py-1 rounded-full">
            Số dư: <span className="font-bold text-yellow-300">0 VNĐ</span>
          </div>
          
          <button className="p-2 hover:bg-blue-800 rounded-lg transition-all duration-200 hover:scale-105 relative">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3 bg-blue-800 px-3 py-2 rounded-lg hover:bg-blue-900 transition-all duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">DH</span>
            </div>
            <div className="text-sm">
              <div className="font-medium">dang gia hy</div>
              <div className="text-xs text-blue-200">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
