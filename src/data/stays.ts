/**
 * Stays re-export shim: the canonical dataset lives in hotels.ts.
 * Components import from "@/data/stays" per the component contract.
 */
export { stays, getStayById } from "@/data/hotels";
