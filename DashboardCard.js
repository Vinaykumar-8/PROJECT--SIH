import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * A reusable card component with consistent styling.
 * It takes a title and children to display content.
 * @param {object} props
 * @param {string} props.title - The title of the card.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {object} props.style - Optional custom styles to merge with the default card styles.
 */
const DashboardCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardHeader}>{title}</Text>
    {children}
  </View>
);

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
