
```javascript
const http = require('http');
const readline = require('readline');

// Base de datos simulada de noticias
const noticiasBase = [
  {
    id: 1,
    titulo: 'Avances en Inteligencia Artificial Revolucionan la Tecnología',
    tema: 'tecnologia',
    contenido: 'Nuevos modelos de IA están transformando industrias...',
    fecha: '2024-01-15',
    fuente: 'TechNews',
    relevancia: 9
  },
  {
    id: 2,
    titulo: 'Mercado de Criptomonedas Muestra Recuperación',
    tema: 'finanzas',
    contenido: 'Bitcoin y Ethereum registran ganancias significativas...',
    fecha: '2024-01-14',
    fuente: 'FinanceDaily',
    relevancia: 8
  },
  {
    id: 3,
    titulo: 'Nueva Plataforma de Comercio Electrónico Disrumpe el Mercado',
    tema: 'comercio',
    contenido: 'Startup logra valorizacion de $1B con novedoso modelo...',
    fecha: '2024-01-13',
    fuente: 'BusinessInsider',
    relevancia: 9
  },
  {
    id: 4,
    titulo: 'Programación Cuántica: El Futuro es Ahora',
    tema: 'programacion',
    contenido: 'Google anuncia avances en computación cuántica...',
    fecha: '2024-01-12',
    fuente: 'DevNews',
    relevancia: 10
  },
  {
    id: 5,
    titulo: 'Agricultura Sostenible Aumenta Rendimientos en 40%',
    tema: 'agricultura',
    contenido: 'Nuevas técnicas de cultivo regenerativo muestran resultados...',
    fecha: '2024-01-11',
    fuente: 'AgricultureToday',
    relevancia: 8
  },
  {
    id: 6,
    titulo: 'Tendencias en JavaScript para 2024',
    tema: 'programacion',
    contenido: 'TypeScript y frameworks modernos dominan el desarrollo web...',
    fecha: '2024-01-10',
    fuente: 'CodeBlog',
    relevancia: 9
  },
  {
    id: 7,
    titulo: 'Blockchain Transformando el Comercio Internacional',
    tema: 'comercio',
    contenido: 'Smart contracts reducen tiempos de transacción en 80%...',
    fecha: '2024-01-09',
    fuente: 'TradeNews',
    relevancia: 8
  },
  {
    id: 8,
    titulo: 'Tecnologías Agrícolas de Precisión Salvan Cosechas',
    tema: 'agricultura',
    contenido: 'Drones y sensores IoT mejoran la eficiencia agrícola...',
    fecha: '2024-01-08',
    fuente: 'FarmTech',
    relevancia: 7
  },
  {
    id: 9,
    titulo: 'Ciberseguridad: Nuevas Amenazas en 2024',
    tema: 'tecnologia',
    contenido: 'Expertos advierten sobre ataques sofisticados de IA...',
    fecha: '2024-01-07',
    fuente: 'SecurityNews',
    relevancia: 9
  },
  {
    id: 10,
    titulo: 'Finanzas Descentralizadas Alcanzan Nuevo Récord',
    tema: 'finanzas',
    contenido: 'DeFi crece exponencialmente con nuevos protocolos...',
    fecha: '2024-01-06',
    fuente: 'CryptoDaily',
    relevancia: 8
  }
];

// Clase principal del buscador de noticias
class BuscadorNoticias {
  constructor(noticias) {
    this.noticias = noticias;
    this.temas = [...new Set(noticias.map(n => n.tema))];
  }

  // Buscar noticias por tema
  buscarPorTema(tema) {
    const resultados = this.noticias.filter(n => 
      n.tema.toLowerCase() === tema.toLowerCase()
    );
    return resultados.sort((a, b) => b.relevancia - a.relevancia);
  }

  // Buscar noticias por palabra clave
  buscarPorPalabra(palabra) {
    const palabraLower = palabra.toLowerCase();
    return this.noticias.filter(n =>
      n.titulo.toLowerCase().includes(palabraLower) ||
      n.contenido.toLowerCase().includes(palabraLower) ||
      n.fuente.toLowerCase().includes(palabraLower)
    ).sort((a, b) => b.relevancia - a.relevancia);
  }

  // Buscar noticias por rango de fechas
  buscarPorFecha(fechaInicio, fechaFin) {
    return this.noticias.filter(n => {
      const fecha = new Date(n.fecha);
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      return fecha >= inicio && fecha <= fin;
    }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }

  // Buscar por relevancia mínima
  buscarPorRelevancia(minimaRelevancia) {
    return this.noticias.filter(n => n.relevancia >= minimaRelevancia)
      .sort((a, b) => b.relevancia - a.relev