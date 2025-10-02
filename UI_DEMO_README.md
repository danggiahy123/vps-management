# 🎨 VPS Management UI Demo

## 📱 Mobile App (React Native Expo)

### 🏗️ Structure
```
mobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Dashboard với stats và VM list
│   │   ├── VMDetailScreen.js      # Chi tiết VM với charts và actions
│   │   ├── DomainsScreen.js       # Danh sách domains
│   │   ├── AlertsScreen.js        # Alerts và notifications
│   │   └── ProfileScreen.js       # User profile và settings
│   ├── navigation/
│   │   └── AppNavigator.js        # Tab navigation
│   └── data/
│       └── mockData.js            # Mock data cho mobile
├── App.js                         # Main app component
└── package.json                   # Dependencies
```

### 🎯 Features
- **Home Dashboard**: Stats cards, VM list, alerts summary
- **VM Detail**: Performance charts, resource usage, action buttons
- **Domains**: Domain list với expiry tracking
- **Alerts**: Active alerts với acknowledge/resolve actions
- **Profile**: User info, settings, logout
- **Navigation**: Bottom tab navigation với badges

### 🚀 Run Mobile App
```bash
cd mobile
npm install
npm start
# Scan QR code với Expo Go app
```

## 🖥️ Web Admin (Next.js)

### 🏗️ Structure
```
web-admin/
├── src/
│   ├── app/
│   │   ├── login/page.tsx         # Login form
│   │   ├── dashboard/page.tsx     # Admin dashboard
│   │   ├── users/page.tsx         # Users management
│   │   ├── vps/page.tsx           # VPS management
│   │   ├── alerts/page.tsx        # Alerts & logs
│   │   ├── layout.tsx             # Main layout
│   │   └── page.tsx               # Home redirect
│   ├── components/
│   │   └── Sidebar.tsx            # Navigation sidebar
│   └── data/
│       └── mockData.js            # Mock data cho web
├── package.json                   # Dependencies
└── next.config.js                # Next.js config
```

### 🎯 Features
- **Login**: Authentication form với demo credentials
- **Dashboard**: Overview stats, charts, recent activity
- **Users Management**: User list, add/edit/delete, search/filter
- **VPS Management**: VM grid, start/stop/restart actions, resource monitoring
- **Alerts & Logs**: Alerts management, activity logs, CSV export
- **Sidebar Navigation**: Responsive navigation với active states

### 🚀 Run Web Admin
```bash
cd web-admin
npm install
npm run dev
# Open http://localhost:3000
```

## 🔐 Demo Credentials

### Web Admin Login
- **Email**: `admin@vps-management.com`
- **Password**: `admin123`

## 📊 Mock Data Integration

### Mobile App Data
- **Users**: 1 user (John Doe)
- **VMs**: 3 VMs với different status
- **Domains**: 2 domains với SSL info
- **Alerts**: 3 alerts với different types
- **Metrics**: Timeseries data cho charts

### Web Admin Data
- **Users**: 5 users với different roles
- **VMs**: 5 VMs với resource usage
- **Domains**: 3 domains với expiry dates
- **Alerts**: 3 alerts với different status
- **Logs**: 5 activity logs
- **Charts**: CPU usage timeseries

## 🎨 UI/UX Features

### Mobile App
- **Gradient Headers**: Beautiful gradient backgrounds
- **Status Badges**: Color-coded status indicators
- **Progress Bars**: Resource usage visualization
- **Action Buttons**: Start/Stop/Restart VM actions
- **Charts**: Performance metrics với react-native-chart-kit
- **Navigation**: Tab bar với badges cho alerts

### Web Admin
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on desktop và tablet
- **Data Tables**: Sortable, searchable tables
- **Interactive Charts**: Recharts integration
- **Modal Dialogs**: Add/edit forms
- **Status Indicators**: Color-coded status badges
- **Export Functionality**: CSV export cho data

## 🔄 Demo Flow

### Complete User Journey
1. **Mobile User** → Login → View VPS list → Click VM → View details → Restart VM
2. **Backend** → Logs the action → Updates VM status
3. **Web Admin** → Login → View logs → See the restart action → Manage alerts

### Key Interactions
- **VM Actions**: Start/Stop/Restart với confirmation dialogs
- **Alert Management**: Acknowledge/Resolve/Dismiss alerts
- **User Management**: Add/Edit/Delete users với form validation
- **Data Export**: CSV export cho alerts và logs
- **Real-time Updates**: Status changes reflect immediately

## 🛠️ Technical Stack

### Mobile App
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform và tools
- **React Navigation**: Navigation library
- **React Native Chart Kit**: Charts và graphs
- **Expo Linear Gradient**: Gradient backgrounds
- **Heroicons**: Icon library

### Web Admin
- **Next.js 14**: React framework với App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Unstyled UI components
- **Heroicons**: Icon library
- **Recharts**: Chart library

## 📱 Responsive Design

### Mobile App
- **iOS/Android**: Native look và feel
- **Touch Interactions**: Optimized for touch
- **Safe Areas**: Proper handling của notches
- **Orientation**: Portrait orientation support

### Web Admin
- **Desktop**: Full-featured interface
- **Tablet**: Responsive grid layouts
- **Mobile**: Collapsible sidebar, touch-friendly

## 🎯 Demo Scenarios

### Scenario 1: VM Management
1. User opens mobile app
2. Sees VM list với status
3. Clicks on VM để view details
4. Sees performance charts
5. Clicks "Restart" button
6. Confirms action
7. VM status updates
8. Admin sees log entry

### Scenario 2: Alert Management
1. System generates alert
2. Mobile user sees alert notification
3. User acknowledges alert
4. Admin views alerts page
5. Admin resolves alert
6. Status updates across both apps

### Scenario 3: User Management
1. Admin logs into web panel
2. Views users list
3. Adds new user
4. Edits user permissions
5. User appears in mobile app
6. User can login và access VMs

## 🚀 Next Steps

### Development
1. **Connect to Backend**: Replace mock data với real API calls
2. **Authentication**: Implement JWT authentication
3. **Real-time Updates**: WebSocket integration
4. **Push Notifications**: Mobile notifications
5. **Offline Support**: Cache data for offline use

### Production
1. **Deploy Mobile**: Expo Application Services (EAS)
2. **Deploy Web**: Vercel/Netlify
3. **Database**: MongoDB Atlas
4. **Monitoring**: Error tracking và analytics
5. **Security**: HTTPS, API rate limiting

---
**Created**: $(date)  
**Status**: ✅ Complete UI Demo Ready
