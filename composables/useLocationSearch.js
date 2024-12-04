import { ref } from "vue";
const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export function useLocationSearch() {
  const searchQuery = ref("");
  const suggestions = ref([]);
  const loading = ref(false);
  const error = ref(false);
  const errorMessages = ref("");

  // Reset error state
  const resetErrorState = () => {
    error.value = false;
    errorMessages.value = "";
  };

  // Handle error
  const handleError = (message) => {
    error.value = true;
    errorMessages.value = message || "An error occurred.";
  };

  // Update suggestions
  const updateSuggestions = (locationData, propertyData) => {
    // Combine location and property data
    const combinedSuggestions = [...locationData, ...propertyData];

    // Remove duplicates (assuming 'id' is a unique identifier)
    suggestions.value = combinedSuggestions.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.id === value.id)
    );
  };

  // Fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    if (!query) return [];

    try {
      const { data, error: fetchError } = await useFetch(
        `${API_BASE_URL}/location/search?query=${query}`
      );

      if (fetchError.value) {
        handleError("Failed to fetch location suggestions. Please try again.");
        return [];
      }
      return data.value || [];
    } catch (error) {
      handleError("Unexpected error occurred while fetching location data.");
      return [];
    }
  };

  // Fetch property suggestions
  const fetchPropertySuggestions = async (query) => {
    if (!query) return [];

    try {
      const { data, error: fetchError } = await useFetch(
        `${API_BASE_URL}/property/search?query=${query}`
      );

      if (fetchError.value) {
        handleError("Failed to fetch property suggestions. Please try again.");
        return [];
      }
      return data.value || [];
    } catch (error) {
      handleError("Unexpected error occurred while fetching property data.");
      return [];
    }
  };

  // Main function to call both searches and merge results
  const fetchSuggestions = async (query) => {
    if (!query) {
      suggestions.value = [];
      return;
    }

    loading.value = true;
    resetErrorState();

    try {
      const [locationData, propertyData] = await Promise.all([
        fetchPropertySuggestions(query),
        fetchLocationSuggestions(query),
      ]);

      updateSuggestions(locationData, propertyData);
    } catch (error) {
      handleError("Unexpected error occurred while fetching suggestions.");
    } finally {
      loading.value = false;
    }
  };

  return {
    searchQuery,
    suggestions,
    loading,
    error,
    errorMessages,
    fetchSuggestions,
  };
}
