import axios from 'axios';

export const getRestaurants = async (req, res) => {
  let { location } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  // Verificar si location es un formato de coordenadas (latitude,longitude)
  const coordinatesRegex = /^(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)$/;
  if (!coordinatesRegex.test(location)) {
    // Si location no es en formato de coordenadas, usar la API findplace de Google para obtener coordenadas
    try {
      const findPlaceResponse = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
        params: {
          input: location,
          inputtype: 'textquery',
          fields: 'geometry',
          key: apiKey
        }
      });

      // Extraer las coordenadas de la respuesta de findplace
      const { lat, lng } = findPlaceResponse.data.candidates[0].geometry.location;
      location = `${lat},${lng}`; // Formatear las coordenadas como latitude,longitude
    } catch (error) {
      console.error('Error al obtener las coordenadas usando findplace:', error);
      return res.status(400).json({ msg: 'Invalid location' });
    }
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: location,
        radius: 1500, // Radio en metros para buscar lugares cercanos
        type: 'restaurant',
        key: apiKey
      }
    });

    // Mapear los resultados para obtener solo name y vicinity
    const restaurants = response.data.results.map((restaurant) => ({
      name: restaurant.name,
      vicinity: restaurant.vicinity
    }));

    res.json(restaurants);
  } catch (err) {
    console.error('Error al obtener los restaurantes de Google Places:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
