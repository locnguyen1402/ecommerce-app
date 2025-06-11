import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState, User, Address } from '@/types';

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              ...userData,
              updatedAt: new Date().toISOString(),
            },
          });
        }
      },

      addAddress: (address: Omit<Address, 'id'>) => {
        const { user } = get();
        if (user) {
          const newAddress: Address = {
            ...address,
            id: `addr_${Date.now()}`,
          };

          // If this is the first address or marked as default, set it as default
          if (user.addresses.length === 0 || address.isDefault) {
            // Remove default from other addresses
            const updatedAddresses = user.addresses.map(addr => ({
              ...addr,
              isDefault: false,
            }));
            newAddress.isDefault = true;

            set({
              user: {
                ...user,
                addresses: [...updatedAddresses, newAddress],
                updatedAt: new Date().toISOString(),
              },
            });
          } else {
            set({
              user: {
                ...user,
                addresses: [...user.addresses, newAddress],
                updatedAt: new Date().toISOString(),
              },
            });
          }
        }
      },

      updateAddress: (addressId: string, addressData: Partial<Address>) => {
        const { user } = get();
        if (user) {
          let updatedAddresses = user.addresses.map(addr =>
            addr.id === addressId ? { ...addr, ...addressData } : addr
          );

          // If setting this address as default, remove default from others
          if (addressData.isDefault) {
            updatedAddresses = updatedAddresses.map(addr => ({
              ...addr,
              isDefault: addr.id === addressId,
            }));
          }

          set({
            user: {
              ...user,
              addresses: updatedAddresses,
              updatedAt: new Date().toISOString(),
            },
          });
        }
      },

      removeAddress: (addressId: string) => {
        const { user } = get();
        if (user) {
          const addressToRemove = user.addresses.find(addr => addr.id === addressId);
          let updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);

          // If we removed the default address, set the first remaining as default
          if (addressToRemove?.isDefault && updatedAddresses.length > 0) {
            updatedAddresses[0].isDefault = true;
          }

          set({
            user: {
              ...user,
              addresses: updatedAddresses,
              updatedAt: new Date().toISOString(),
            },
          });
        }
      },
    }),
    {
      name: 'ecommerce-user',
      storage: createJSONStorage(() => AsyncStorage),
      // Persist all user data
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
