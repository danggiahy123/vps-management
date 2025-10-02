'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm inline-block">
          <span>Trang chủ</span>
          <span className="mx-2 text-blue-500">></span>
          <span className="text-gray-900 font-medium">Dashboard</span>
        </nav>
      </div>

      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Xin chào dang gia hy 👋
        </h1>
        <p className="text-lg text-gray-600">Chào mừng bạn quay trở lại với hệ thống quản lý VPS</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Dịch vụ */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">🖥️</span>
            </div>
            <div className="ml-6">
              <p className="text-sm font-medium text-gray-600 mb-1">Dịch vụ</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-xs text-blue-600 mt-1">VPS đang hoạt động</p>
            </div>
          </div>
        </div>

        {/* Tài khoản */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">💰</span>
            </div>
            <div className="ml-6">
              <p className="text-sm font-medium text-gray-600 mb-1">Tài khoản</p>
              <p className="text-3xl font-bold text-gray-900">0 đ</p>
              <p className="text-xs text-green-600 mt-1">Số dư hiện tại</p>
            </div>
          </div>
        </div>

        {/* Thanh toán chờ */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">🔔</span>
            </div>
            <div className="ml-6">
              <p className="text-sm font-medium text-gray-600 mb-1">Thanh toán chờ</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-xs text-orange-600 mt-1">Cần xử lý</p>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">💬</span>
            </div>
            <div className="ml-6">
              <p className="text-sm font-medium text-gray-600 mb-1">Tickets</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-xs text-purple-600 mt-1">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Thống kê dịch vụ */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="mr-3 text-2xl">📊</span>
                Thống kê dịch vụ
              </h3>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 hover:scale-105 shadow-lg">
                Chi tiết
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Dịch vụ</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Số lượng</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                    <td className="py-4 px-6 text-gray-900 font-medium">VPS</td>
                    <td className="py-4 px-6 text-gray-900 font-bold">0</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Chưa có</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Thông báo mới */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-2xl">🔔</span>
              Thông báo mới
            </h3>
            <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <span className="text-4xl mb-2 block">📭</span>
                <p className="text-gray-500 font-medium">Không có thông báo mới</p>
              </div>
            </div>
          </div>

          {/* Kết nối mạng xã hội */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-3 text-2xl">🌐</span>
              Kết nối mạng xã hội
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Tham gia vào nhóm của chúng tôi để được hỗ trợ, giao lưu và cập nhập các thông tin mới nhất về VPS
            </p>
            <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-lg">
              Tham gia ngay
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Thông tin cá nhân */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-2xl">👤</span>
              Thông tin cá nhân
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Họ và tên:</span>
                <span className="text-gray-900 font-semibold">dang gia hy</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900 font-semibold">saoxugdc@gmail.com</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Đặc quyền:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">Cơ bản</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">2FA:</span>
                <div className="w-6 h-6 border-2 border-gray-300 rounded hover:border-blue-500 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Số dư:</span>
                <span className="text-gray-900 font-bold">0 đ</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Đã chi:</span>
                <span className="text-gray-900 font-bold">0 đ</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Đã nạp:</span>
                <span className="text-green-600 font-bold">1.400.000 ₫</span>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <button className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 hover:scale-105 shadow-lg font-semibold">
                <span className="mr-3 text-xl">💰</span>
                Nạp tiền
              </button>
              <button className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-lg font-semibold">
                <span className="mr-3 text-xl">📄</span>
                Tất cả giao dịch
              </button>
            </div>
          </div>

          {/* Hướng dẫn */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-2xl">📚</span>
              Hướng dẫn
            </h3>
            <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <span className="text-4xl mb-2 block">📖</span>
                <p className="text-gray-500 font-medium">Không có hướng dẫn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}