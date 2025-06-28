import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = () => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('session_token');
    if (!token) {
      throw redirect(302, '/login');
    }
  }
};