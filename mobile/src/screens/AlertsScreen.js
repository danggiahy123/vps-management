import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { mockAlerts } from '../data/mockData';

const AlertsScreen = ({ navigation }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close-circle';
      case 'info':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'error':
        return '#F44336';
      case 'info':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now - date;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const renderAlertItem = ({ item }) => (
    <TouchableOpacity style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <View style={styles.alertIconContainer}>
          <Ionicons
            name={getAlertIcon(item.type)}
            size={20}
            color={getAlertColor(item.type)}
          />
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          <Text style={styles.alertTime}>{formatTime(item.createdAt)}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'active' ? '#4CAF50' : '#9E9E9E' }
        ]}>
          <Text style={styles.statusText}>
            {item.status === 'active' ? 'ACTIVE' : 'RESOLVED'}
          </Text>
        </View>
      </View>
      <Text style={styles.alertMessage}>{item.message}</Text>
      {item.status === 'active' && (
        <View style={styles.alertActions}>
          <TouchableOpacity style={styles.acknowledgeButton}>
            <Text style={styles.acknowledgeText}>Acknowledge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resolveButton}>
            <Text style={styles.resolveText}>Resolve</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = mockAlerts.filter(alert => alert.status !== 'active');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Alerts & Notifications</Text>
        <Text style={styles.headerSubtitle}>Monitor your system alerts</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="notifications" size={24} color="#FF5722" />
            <Text style={styles.summaryNumber}>{activeAlerts.length}</Text>
            <Text style={styles.summaryLabel}>Active Alerts</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.summaryNumber}>{resolvedAlerts.length}</Text>
            <Text style={styles.summaryLabel}>Resolved</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="warning" size={24} color="#FF9800" />
            <Text style={styles.summaryNumber}>
              {mockAlerts.filter(a => a.type === 'warning' || a.type === 'critical').length}
            </Text>
            <Text style={styles.summaryLabel}>Critical</Text>
          </View>
        </View>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Alerts</Text>
            <FlatList
              data={activeAlerts}
              renderItem={renderAlertItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Resolved</Text>
            <FlatList
              data={resolvedAlerts}
              renderItem={renderAlertItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Empty State */}
        {mockAlerts.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off" size={64} color="#CCC" />
            <Text style={styles.emptyTitle}>No Alerts</Text>
            <Text style={styles.emptySubtitle}>
              Your system is running smoothly with no active alerts.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  alertMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  acknowledgeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
  },
  acknowledgeText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  resolveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
  },
  resolveText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});

export default AlertsScreen;
