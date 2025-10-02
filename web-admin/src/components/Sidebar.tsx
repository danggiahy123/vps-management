'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', active: true },
  ];

  const services = [
    { name: 'Cloud VPS VN', hasPlus: true },
    { name: 'VPS Nước ngoài', hasPlus: true },
    { name: 'Dịch vụ Proxy', hasPlus: true },
    { name: 'Dịch vụ của tôi', hasPlus: true },
  ];

  const payment = [
    { name: 'Đơn đặt hàng' },
    { name: 'Hóa đơn' },
  ];

  const transactions = [
    { name: 'Nạp tiền' },
    { name: 'Lịch sử giao dịch' },
  ];

  const activity = [
    { name: 'Nhật ký hoạt động' },
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-white to-gray-50 shadow-2xl h-full border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-blue-600 text-2xl">☁️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              CLOUD NEST TECHNOLOGY
            </h1>
            <p className="text-xs text-blue-200">VPS Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-6 overflow-y-auto h-full">
        {/* Dashboard */}
        <div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:scale-105'
                }`}
              >
                <span className="mr-3 text-lg">🏠</span>
                {item.name}
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* DỊCH VỤ */}
        <div>
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <span className="mr-2">📦</span>
            DỊCH VỤ
          </h3>
          <div className="space-y-1">
            {services.map((item, index) => (
              <div key={index} className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group">
                <div className="flex items-center">
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">☁️</span>
                  {item.name}
                </div>
                {item.hasPlus && (
                  <span className="text-blue-500 font-bold group-hover:scale-110 transition-transform duration-200">+</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* THANH TOÁN */}
        <div>
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <span className="mr-2">💳</span>
            THANH TOÁN
          </h3>
          <div className="space-y-1">
            {payment.map((item, index) => (
              <div key={index} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group">
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">🛒</span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* GIAO DỊCH */}
        <div>
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <span className="mr-2">💸</span>
            GIAO DỊCH
          </h3>
          <div className="space-y-1">
            {transactions.map((item, index) => (
              <div key={index} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-600 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group">
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">💰</span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* NHẬT KÝ HOẠT ĐỘNG */}
        <div>
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <span className="mr-2">📊</span>
            NHẬT KÝ HOẠT ĐỘNG
          </h3>
          <div className="space-y-1">
            {activity.map((item, index) => (
              <div key={index} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group">
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">📄</span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}