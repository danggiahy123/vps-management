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
import { mockVMs, mockDomains, mockAlerts } from '../data/mockData';

const HomeScreen = ({ navigation }) => {
  const runningVMs = mockVMs.filter(vm => vm.status === 'running').length;
  const stoppedVMs = mockVMs.filter(vm => vm.status === 'stopped').length;
  const activeDomains = mockDomains.filter(domain => domain.status === 'active').length;
  const expiringDomains = mockDomains.filter(domain => {
    const daysUntilExpiry = Math.ceil((new Date(domain.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  }).length;
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active').length;

  const renderVMItem = ({ item }) => (
    <TouchableOpacity
      style={styles.vmCard}
      onPress={() => navigation.navigate('VMDetail', { vm: item })}
    >
      <View style={styles.vmHeader}>
        <Text style={styles.vmName}>{item.name}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'running' ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.vmIP}>IP: {item.ip}</Text>
      <Text style={styles.vmSpecs}>CPU: {item.cpu}% | RAM: {item.ram}% | Disk: {item.disk}%</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.appTitle}>VPS Management</Text>
        <Text style={styles.welcomeText}>Welcome back, John!</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="server" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>{runningVMs}</Text>
            <Text style={styles.statLabel}>Running VMs</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="server-outline" size={24} color="#F44336" />
            <Text style={styles.statNumber}>{stoppedVMs}</Text>
            <Text style={styles.statLabel}>Stopped VMs</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="globe" size={24} color="#2196F3" />
            <Text style={styles.statNumber}>{activeDomains}</Text>
            <Text style={styles.statLabel}>Active Domains</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="warning" size={24} color="#FF9800" />
            <Text style={styles.statNumber}>{expiringDomains}</Text>
            <Text style={styles.statLabel}>Expiring Soon</Text>
          </View>
        </View>

        {/* Alerts Card */}
        <View style={styles.alertsCard}>
          <View style={styles.alertsHeader}>
            <Ionicons name="notifications" size={20} color="#FF5722" />
            <Text style={styles.alertsTitle}>Active Alerts</Text>
            <Text style={styles.alertsCount}>{activeAlerts}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAlertsButton}
            onPress={() => navigation.navigate('Alerts')}
          >
            <Text style={styles.viewAlertsText}>View All Alerts</Text>
            <Ionicons name="chevron-forward" size={16} color="#667eea" />
          </TouchableOpacity>
        </View>

        {/* VMs List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your VPS Servers</Text>
          <FlatList
            data={mockVMs}
            renderItem={renderVMItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
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
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  alertsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  alertsCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  viewAlertsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  viewAlertsText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  vmCard: {
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
  vmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vmName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  vmIP: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  vmSpecs: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;

