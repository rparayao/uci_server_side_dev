import knex from 'knex'
import { development } from './localknex.js';

export default knex(development);