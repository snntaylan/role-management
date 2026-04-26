/**
 * App Hooks
 * Custom hooks for Redux dispatch and selector usage throughout the app
 */

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

/**
 * Pre-typed useDispatch hook
 * Use this instead of plain useDispatch for type safety
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Pre-typed useSelector hook
 * Use this instead of plain useSelector for type safety
 */
export const useAppSelector = useSelector as <T>(selector: (state: RootState) => T) => T;
