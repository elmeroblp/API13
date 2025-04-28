import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Método no permitido. Usa POST.');
    return;
  }

  try {
    const { texto } = req.body;

    if (!texto) {
      res.status(400).send('Falta el parámetro "texto".');
      return;
    }

    // Guardamos el texto en un archivo (agregando nueva línea)
    await fs.appendFile('datos.txt', texto + '\n');

    res.status(200).send('Texto guardado correctamente.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error en el servidor.');
  }
}
