import client from '../db.js';

const getEquipos = async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM equipos ORDER BY id_equipo');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getEquipoById = async (req, res) => {
  const { id_equipo } = req.params;
  try {
    // Asegúrate de que id_equipo es un número para evitar inyección SQL
    const parsedId = parseInt(id_equipo, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    const result = await client.execute(`SELECT * FROM equipos WHERE id_equipo = ${parsedId}`);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createEquipo = async (req, res) => {
  const { nombre, tipo, marca, modelo, serie, ae_title, ip_address, ubicacion, id_sede } = req.body;

  // Validaciones de los datos
  if (!nombre || nombre.length > 80) {
    return res.status(400).json({ error: 'El nombre del equipo no debe estar vacío y no debe de tener más de 80 caracteres' });
  }
  if (!tipo || tipo.length > 80) {
    return res.status(400).json({ error: 'El tipo del equipo no debe estar vacío y no debe de tener más de 80 caracteres' });
  }

  // Construimos la consulta SQL directamente con los valores incluidos
  const queryString = `
    INSERT INTO equipos (nombre, tipo, marca, modelo, serie, ae_title, ip_address, ubicacion, id_sede)
    VALUES ('${nombre}', '${tipo}', '${marca}', '${modelo}', '${serie}', '${ae_title}', '${ip_address}', '${ubicacion}', ${id_sede})
    RETURNING *
  `;

  try {
    const result = await client.execute(queryString);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateEquipo = async (req, res) => {
  const { id_equipo } = req.params;
  const { nombre, tipo, marca, modelo, serie, ae_title, ip_address, ubicacion, id_sede } = req.body;

  // Validaciones de los datos
  if (!nombre || nombre.length > 80) {
    return res.status(400).json({ tipo: 'error', mensaje: 'El nombre del equipo no debe estar vacío y no debe de tener más de 80 caracteres' });
  }
  if (!tipo || tipo.length > 80) {
    return res.status(400).json({ tipo: 'error', mensaje: 'El tipo del equipo no debe estar vacío y no debe de tener más de 80 caracteres' });
  }
  // Agrega más validaciones según sea necesario

  // Construimos la consulta SQL directamente con los valores incluidos
  const queryString = `
    UPDATE equipos 
    SET nombre = '${nombre}', tipo = '${tipo}', marca = '${marca}', modelo = '${modelo}', serie = '${serie}', ae_title = '${ae_title}', ip_address = '${ip_address}', ubicacion = '${ubicacion}', id_sede = ${id_sede} 
    WHERE id_equipo = ${id_equipo}
    RETURNING *
  `;

  try {
    const result = await client.execute(queryString);
    
    // Si no se encuentra el equipo, devolvemos un mensaje de error
    if (result.rows.length === 0) {
      return res.status(404).json({ tipo: 'error', mensaje: 'Equipo no encontrado' });
    }

    // Devolvemos un mensaje de éxito junto con el equipo actualizado
    res.json({ tipo: 'success', mensaje: 'Equipo actualizado con éxito', equipo: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ tipo: 'error', mensaje: 'Error en el servidor' });
  }
};


const deleteEquipo = async (req, res) => {
  const { id_equipo } = req.params;
  
  try {
    // Construimos la consulta SQL directamente con el valor del ID
    const queryString = `
      DELETE FROM equipos 
      WHERE id_equipo = ${id_equipo}
      RETURNING *
    `;
    
    const result = await client.execute(queryString);

    // Si no se encuentra el equipo, devolvemos un mensaje de error
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    // Devolvemos un mensaje de éxito
    res.json({ message: 'Equipo eliminado correctamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export { 
  getEquipos,
  getEquipoById,
  createEquipo,
  updateEquipo,
  deleteEquipo
};