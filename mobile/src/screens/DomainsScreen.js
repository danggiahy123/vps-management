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
import { mockDomains } from '../data/mockData';

const DomainsScreen = ({ navigation }) => {
  const getDaysUntilExpiry = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#4CAF50' : '#F44336';
  };

  const getExpiryColor = (days) => {
    if (days <= 30) return '#FF5722';
    if (days <= 90) return '#FF9800';
    return '#4CAF50';
  };

  const renderDomainItem = ({ item }) => {
    const daysUntilExpiry = getDaysUntilExpiry(item.expiresAt);
    const sslDaysUntilExpiry = item.ssl.enabled ? getDaysUntilExpiry(item.ssl.expiresAt) : null;

    return (
      <TouchableOpacity
        style={styles.domainCard}
        onPress={() => navigation.navigate('DomainDetail', { domain: item })}
      >
        <View style={styles.domainHeader}>
          <Text style={styles.domainName}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.domainInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={16} color="#666" />
            <Text style={styles.infoText}>
              Expires in {daysUntilExpiry} days
            </Text>
            <View style={[
              styles.expiryIndicator,
              { backgroundColor: getExpiryColor(daysUntilExpiry) }
            ]} />
          </View>
          
          {item.ssl.enabled && (
            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
              <Text style={styles.infoText}>
                SSL expires in {sslDaysUntilExpiry} days
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Domains</Text>
        <Text style={styles.headerSubtitle}>Manage your domains and DNS</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="globe" size={24} color="#2196F3" />
            <Text style={styles.summaryNumber}>{mockDomains.length}</Text>
            <Text style={styles.summaryLabel}>Total Domains</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.summaryNumber}>
              {mockDomains.filter(d => d.status === 'active').length}
            </Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="warning" size={24} color="#FF9800" />
            <Text style={styles.summaryNumber}>
              {mockDomains.filter(d => getDaysUntilExpiry(d.expiresAt) <= 30).length}
            </Text>
            <Text style={styles.summaryLabel}>Expiring Soon</Text>
          </View>
        </View>

        {/* Domains List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Domains</Text>
          <FlatList
            data={mockDomains}
            renderItem={renderDomainItem}
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  domainCard: {
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
  domainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  domainName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
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
  domainInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  expiryIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default DomainsScreen;
