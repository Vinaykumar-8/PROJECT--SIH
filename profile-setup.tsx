import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Plus } from 'lucide-react-native';

export default function ProfileSetupScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    mobile: '',
    email: '',
    aadhaar: '',
    country: '',
    address: '',
    city: '',
    district: '',
    state: '',
    contactPersonName: '',
    emergencyContact: '',
    contactRelation: '',
    isDoctor: false,
    travelMode: '',
    medicalCondition: '',
    driverName: '',
    vehicleNumber: '',
  });

  const [dependents, setDependents] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDependent = () => {
    router.push('/add-dependent');
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['fullName', 'age', 'gender', 'mobile', 'email', 'emergencyContact'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Save profile data (in real app, save to secure storage or database)
    Alert.alert(
      'Profile Setup Complete',
      'Your profile has been created successfully. You can now select tours.',
      [
        {
          text: 'Continue',
          onPress: () => router.replace('/(tabs)/tours')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Setup</Text>
        <Text style={styles.headerSubtitle}>Complete your tourist profile</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Age *</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(text) => handleInputChange('age', text)}
              placeholder="Age"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Gender *</Text>
            <TextInput
              style={styles.input}
              value={formData.gender}
              onChangeText={(text) => handleInputChange('gender', text)}
              placeholder="Male/Female/Other"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mobile Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.mobile}
            onChangeText={(text) => handleInputChange('mobile', text)}
            placeholder="Mobile number to be carried during yatra"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Aadhaar Card Number</Text>
          <TextInput
            style={styles.input}
            value={formData.aadhaar}
            onChangeText={(text) => handleInputChange('aadhaar', text)}
            placeholder="Enter Aadhaar number"
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Address Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            style={styles.input}
            value={formData.country}
            onChangeText={(text) => handleInputChange('country', text)}
            placeholder="Enter country"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="Enter full address"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(text) => handleInputChange('city', text)}
              placeholder="City"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>District</Text>
            <TextInput
              style={styles.input}
              value={formData.district}
              onChangeText={(text) => handleInputChange('district', text)}
              placeholder="District"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>State</Text>
          <TextInput
            style={styles.input}
            value={formData.state}
            onChangeText={(text) => handleInputChange('state', text)}
            placeholder="Enter state"
          />
        </View>

        <Text style={styles.sectionTitle}>Emergency Contact</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contact Person Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.contactPersonName}
            onChangeText={(text) => handleInputChange('contactPersonName', text)}
            placeholder="Emergency contact name"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Emergency Contact *</Text>
            <TextInput
              style={styles.input}
              value={formData.emergencyContact}
              onChangeText={(text) => handleInputChange('emergencyContact', text)}
              placeholder="Contact number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Relation</Text>
            <TextInput
              style={styles.input}
              value={formData.contactRelation}
              onChangeText={(text) => handleInputChange('contactRelation', text)}
              placeholder="Relation"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Additional Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Medical Condition (if any)</Text>
          <TextInput
            style={styles.input}
            value={formData.medicalCondition}
            onChangeText={(text) => handleInputChange('medicalCondition', text)}
            placeholder="Describe any medical conditions"
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mode of Travel</Text>
          <TextInput
            style={styles.input}
            value={formData.travelMode}
            onChangeText={(text) => handleInputChange('travelMode', text)}
            placeholder="e.g., Car, Bus, Train"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Driver's Name</Text>
            <TextInput
              style={styles.input}
              value={formData.driverName}
              onChangeText={(text) => handleInputChange('driverName', text)}
              placeholder="Driver name"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              value={formData.vehicleNumber}
              onChangeText={(text) => handleInputChange('vehicleNumber', text)}
              placeholder="Vehicle number"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Dependents</Text>
        
        <TouchableOpacity style={styles.addDependentButton} onPress={addDependent}>
          <Plus size={20} color="#16a34a" />
          <Text style={styles.addDependentText}>Add Dependent</Text>
        </TouchableOpacity>

        {dependents.length > 0 && (
          <View style={styles.dependentsList}>
            {dependents.map((dependent, index) => (
              <View key={index} style={styles.dependentCard}>
                <Text style={styles.dependentName}>{dependent.name}</Text>
                <Text style={styles.dependentInfo}>Age: {dependent.age}, Relation: {dependent.relation}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Complete Profile Setup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#16a34a',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bbf7d0',
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  addDependentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#16a34a',
    borderStyle: 'dashed',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  addDependentText: {
    color: '#16a34a',
    fontSize: 16,
    fontWeight: '600',
  },
  dependentsList: {
    marginBottom: 20,
  },
  dependentCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  dependentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  dependentInfo: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#16a34a',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
