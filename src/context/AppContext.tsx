import React,{createContext,useContext,useMemo,useState,useCallback} from 'react';
import {MOVIES} from '../data/movies.data';
import {EVENTS} from '../data/events.data';
import {CITIES} from './cities';

export type User={name:string;email:string};
export type SearchResult={type:'movie'|'event';id:number;title:string;subtitle:string;image:string};
export type ShowTime={id:string;time:string;format:string;venue:string;price:number};
export type SeatSelection={category:string;count:number;pricePerSeat:number};
export type Booking={id:string;movieId:number;movieTitle:string;moviePoster:string;showTime:ShowTime;seats:SeatSelection[];totalAmount:number;convenienceFee:number;city:string;bookedAt:string;status:'confirmed'|'cancelled'};

const loadJSON=<T,>(key:string,fallback:T):T=>{try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback}catch{return fallback}};
const sessionUser=():User|null=>{try{const x=sessionStorage.getItem('bms_current_user');return x?JSON.parse(x):null}catch{return null}};

const defaultCity=localStorage.getItem('bms_city')||'Bengaluru';
const initialBookings=loadJSON<Booking[]>('bms_bookings',[]);

const AuthContext=createContext<any>(null);
export function AuthProvider({children}:{children:React.ReactNode}){
 const [currentUser,setCurrentUser]=useState<User|null>(sessionUser);
 const getUsers=()=>loadJSON<Record<string,{name:string,password:string}>>('bms_users',{});
 const register=(name:string,email:string,password:string)=>{const users=getUsers();if(users[email])return false;users[email]={name,password};localStorage.setItem('bms_users',JSON.stringify(users));return true};
 const login=(email:string,password:string)=>{const u=getUsers()[email];if(!u||u.password!==password)return false;const logged={name:u.name,email};sessionStorage.setItem('bms_current_user',JSON.stringify(logged));setCurrentUser(logged);return true};
 const logout=()=>{sessionStorage.removeItem('bms_current_user');setCurrentUser(null)};
 return <AuthContext.Provider value={{currentUser,isLoggedIn:!!currentUser,register,login,logout}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);

const CityContext=createContext<any>(null);
export function CityProvider({children}:{children:React.ReactNode}){const [selectedCity,setSelectedCity]=useState(defaultCity);const setCity=(c:string)=>{localStorage.setItem('bms_city',c);setSelectedCity(c)};return <CityContext.Provider value={{cities:CITIES,selectedCity,setCity}}>{children}</CityContext.Provider>}
export const useCity=()=>useContext(CityContext);

const MovieContext=createContext<any>(null);
export function MovieProvider({children}:{children:React.ReactNode}){const {selectedCity}=useCity();const [filters,setFilters]=useState<{genres:string[];languages:string[]}>({genres:[],languages:[]});const cityMovies=useMemo(()=>MOVIES.filter(m=>m.cities.includes(selectedCity)),[selectedCity]);const filteredMovies=useMemo(()=>cityMovies.filter(m=>(!filters.genres.length||m.genre.some(g=>filters.genres.includes(g)))&&(!filters.languages.length||m.language.some(l=>filters.languages.includes(l)))),[cityMovies,filters]);const toggle=(k:'genres'|'languages',v:string)=>setFilters(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}));const clearFilters=()=>setFilters({genres:[],languages:[]});return <MovieContext.Provider value={{allMovies:MOVIES,allGenres:[...new Set(MOVIES.flatMap(m=>m.genre))].sort(),allLanguages:[...new Set(MOVIES.flatMap(m=>m.language))].sort(),filters,cityMovies,filteredMovies,toggleGenre:(v:string)=>toggle('genres',v),toggleLanguage:(v:string)=>toggle('languages',v),clearFilters,hasActiveFilters:!!(filters.genres.length||filters.languages.length)}}>{children}</MovieContext.Provider>}
export const useMovies=()=>useContext(MovieContext);

const EventContext=createContext<any>(null);
export function EventProvider({children}:{children:React.ReactNode}){const [filters,setFilters]=useState<{categories:string[];languages:string[];cities:string[]}>({categories:[],languages:[],cities:[]});const allCategories=[...new Set(EVENTS.flatMap(e=>e.category))].sort();const allLanguages=[...new Set(EVENTS.flatMap(e=>e.language))].sort();const allCities=[...new Set(EVENTS.map(e=>e.city))].sort();const filteredEvents=useMemo(()=>EVENTS.filter(e=>(!filters.categories.length||e.category.some(x=>filters.categories.includes(x)))&&(!filters.languages.length||e.language.some(x=>filters.languages.includes(x)))&&(!filters.cities.length||filters.cities.includes(e.city))),[filters]);const toggle=(k:'categories'|'languages'|'cities',v:string)=>setFilters(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}));const clearFilters=()=>setFilters({categories:[],languages:[],cities:[]});return <EventContext.Provider value={{allEvents:EVENTS,allCategories,allLanguages,allCities,filters,filteredEvents,toggleCategory:(v:string)=>toggle('categories',v),toggleLanguage:(v:string)=>toggle('languages',v),toggleCity:(v:string)=>toggle('cities',v),clearFilters,hasActiveFilters:!!(filters.categories.length||filters.languages.length||filters.cities.length)}}>{children}</EventContext.Provider>}
export const useEvents=()=>useContext(EventContext);

const SearchContext=createContext<any>(null);
export function SearchProvider({children}:{children:React.ReactNode}){const [query,setQueryState]=useState('');const isOpen=query.length>=2;const results=useMemo<SearchResult[]>(()=>{const q=query.trim().toLowerCase();if(q.length<2)return [];const ms=MOVIES.filter(m=>m.title.toLowerCase().includes(q)||m.genre.some(g=>g.toLowerCase().includes(q))).slice(0,5).map(m=>({type:'movie' as const,id:m.id,title:m.title,subtitle:m.genre.join(', '),image:m.poster}));const es=EVENTS.filter(e=>e.name.toLowerCase().includes(q)||e.category.some(c=>c.toLowerCase().includes(q))).slice(0,4).map(e=>({type:'event' as const,id:e.id,title:e.name,subtitle:`${e.city} · ${e.date}`,image:e.banner}));return [...ms,...es]},[query]);const setQuery=(q:string)=>setQueryState(q);const clear=()=>setQueryState('');return <SearchContext.Provider value={{query,isOpen,results,setQuery,clear}}>{children}</SearchContext.Provider>}
export const useSearch=()=>useContext(SearchContext);

const BookingContext=createContext<any>(null);
export const SHOW_TIMES:ShowTime[]=[{id:'st1',time:'10:00 AM',format:'2D',venue:'PVR Cinemas, Forum Mall',price:200},{id:'st2',time:'01:15 PM',format:'2D',venue:'INOX Garuda Mall',price:220},{id:'st3',time:'04:30 PM',format:'3D',venue:'Cinepolis Orion',price:300},{id:'st4',time:'07:45 PM',format:'IMAX',venue:'PVR IMAX, VR Mall',price:450},{id:'st5',time:'10:30 PM',format:'2D',venue:'SPI Cinemas',price:180}];
export const SEAT_CATEGORIES=[{category:'Recliner',multiplier:2.2},{category:'Premium',multiplier:1.5},{category:'Executive',multiplier:1},{category:'Normal',multiplier:.7}];
export function BookingProvider({children}:{children:React.ReactNode}){const [bookings,setBookings]=useState<Booking[]>(initialBookings);const persist=(next:Booking[])=>{setBookings(next);localStorage.setItem('bms_bookings',JSON.stringify(next))};const createBooking=(data:Omit<Booking,'id'|'bookedAt'|'status'>)=>{const b:Booking={...data,id:'BMS'+Date.now(),bookedAt:new Date().toLocaleString('en-IN'),status:'confirmed'};persist([b,...bookings]);return b};const cancelBooking=(id:string)=>persist(bookings.map(b=>b.id===id?{...b,status:'cancelled'}:b));const getBookingById=(id:string)=>bookings.find(b=>b.id===id);return <BookingContext.Provider value={{bookings,createBooking,cancelBooking,getBookingById}}>{children}</BookingContext.Provider>}
export const useBookings=()=>useContext(BookingContext);

export function AppProviders({children}:{children:React.ReactNode}){return <AuthProvider><CityProvider><MovieProvider><EventProvider><SearchProvider><BookingProvider>{children}</BookingProvider></SearchProvider></EventProvider></MovieProvider></CityProvider></AuthProvider>}
