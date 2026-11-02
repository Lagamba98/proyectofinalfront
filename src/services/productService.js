import { supabase } from './supabaseClient.js';

const TABLE = 'products';

function check({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

export async function getProducts() {
  return check(await supabase.from(TABLE).select('*').order('id', { ascending: true }));
}

export async function getProduct(id) {
  return check(await supabase.from(TABLE).select('*').eq('id', id).single());
}

export async function createProduct(product) {
  return check(await supabase.from(TABLE).insert(product).select().single());
}

export async function updateProduct(id, product) {
  return check(await supabase.from(TABLE).update(product).eq('id', id).select().single());
}

export async function deleteProduct(id) {
  return check(await supabase.from(TABLE).delete().eq('id', id));
}
// Descuenta stock al comprar. Verifica primero que haya unidades suficientes.
export async function decreaseStock(id, quantity) {
  const current = await getProduct(id);
  if (current.stock < quantity) {
    throw new Error(`"${current.name}" solo tiene ${current.stock} unidades disponibles.`);
  }
  return updateProduct(id, { stock: current.stock - quantity });
}
