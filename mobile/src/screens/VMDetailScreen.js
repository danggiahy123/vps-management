import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { mockMetrics } from '../data/mockData';

const VMDetailScreen = ({ route, navigation }) => {
  const { vm } = route.params;
  const [vmStatus, setVmStatus] = useState(vm.status);

  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: mockMetrics.map(m => m.time),
    datasets: [
      {
        data: mockMetrics.map(m => m.cpu),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: mockMetrics.map(m => m.ram),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['CPU %', 'RAM %']
  };

  const handleAction = (action) => {
    Alert.alert(
      `${action} VM`,
      `Are you sure you want to ${action.toLowerCase()} ${vm.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action,
          onPress: () => {
            if (action === 'Start') {
              setVmStatus('running');
            } else if (action === 'Stop') {
              setVmStatus('stopped');
            }
            Alert.alert('Success', `${vm.name} ${action.toLowerCase()}ed successfully!`);
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    return status === 'running' ? '#4CAF50' : '#F44336';
  };

  const getActionButtons = () => {
    if (vmStatus === 'running') {
      return (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.stopButton]}
            onPress={() => handleAction('Stop')}
          >
            <Ionicons name="stop" size={20} color="white" />
            <Text style={styles.actionButtonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.restartButton]}
            onPress={() => handleAction('Restart')}
          >
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.actionButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={() => handleAction('Start')}
          >
            <Ionicons name="play" size={20} color="white" />
            <Text style={styles.actionButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vm.name}</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* VM Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.vmName}>{vm.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(vmStatus) }
            ]}>
              <Text style={styles.statusText}>{vmStatus.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.vmIP}>IP Address: {vm.ip}</Text>
          <Text style={styles.vmOS}>OS: {vm.os}</Text>
        </View>

        {/* Performance Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Performance Metrics (Last 12 Hours)</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#667eea'
              }
            }}
            style={styles.chart}
          />
        </View>

        {/* Resource Usage */}
        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Current Resource Usage</Text>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceLabel}>CPU Usage</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${vm.cpu}%`, backgroundColor: '#667eea' }]} />
            </View>
            <Text style={styles.resourceValue}>{vm.cpu}%</Text>
          </View>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceLabel}>RAM Usage</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${vm.ram}%`, backgroundColor: '#FF6B6B' }]} />
            </View>
            <Text style={styles.resourceValue}>{vm.ram}%</Text>
          </View>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceLabel}>Disk Usage</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${vm.disk}%`, backgroundColor: '#4ECDC4' }]} />
            </View>
            <Text style={styles.resourceValue}>{vm.disk}%</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {getActionButtons()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
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
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vmName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  vmIP: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  vmOS: {
    fontSize: 14,
    color: '#999',
  },
  chartCard: {
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
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
  },
  resourceCard: {
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
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  resourceItem: {
    marginBottom: 15,
  },
  resourceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  resourceValue: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  restartButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default VMDetailScreen;
