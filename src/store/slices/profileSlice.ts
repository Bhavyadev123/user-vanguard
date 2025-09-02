import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id?: string;
  name: string;
  email: string;
  age?: number;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  firstName: string;
  lastName: string;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  firstName: '',
  lastName: '',
};

// Mock API functions
const mockAPI = {
  async saveProfile(profile: Profile): Promise<Profile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          const savedProfile = { ...profile, id: Date.now().toString() };
          localStorage.setItem('profile', JSON.stringify(savedProfile));
          resolve(savedProfile);
        } else {
          reject(new Error('Failed to save profile'));
        }
      }, 1000);
    });
  },

  async getProfile(): Promise<Profile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem('profile');
        if (stored && Math.random() > 0.1) { // 90% success rate
          resolve(JSON.parse(stored));
        } else {
          reject(new Error('Profile not found'));
        }
      }, 500);
    });
  },

  async deleteProfile(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) { // 95% success rate
          localStorage.removeItem('profile');
          resolve();
        } else {
          reject(new Error('Failed to delete profile'));
        }
      }, 500);
    });
  },
};

// Async thunks
export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (profile: Profile) => {
    const response = await mockAPI.saveProfile(profile);
    return response;
  }
);

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await mockAPI.getProfile();
    return response;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async () => {
    await mockAPI.deleteProfile();
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateNames: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    loadFromLocalStorage: (state) => {
      const stored = localStorage.getItem('profile');
      if (stored) {
        state.profile = JSON.parse(stored);
        const nameParts = state.profile?.name.split(' ') || [];
        state.firstName = nameParts[0] || '';
        state.lastName = nameParts.slice(1).join(' ') || '';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Save profile
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        const nameParts = action.payload.name.split(' ');
        state.firstName = nameParts[0] || '';
        state.lastName = nameParts.slice(1).join(' ') || '';
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save profile';
      })
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        const nameParts = action.payload.name.split(' ');
        state.firstName = nameParts[0] || '';
        state.lastName = nameParts.slice(1).join(' ') || '';
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
        state.profile = null;
      })
      // Delete profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.firstName = '';
        state.lastName = '';
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete profile';
      });
  },
});

export const { clearError, updateNames, loadFromLocalStorage } = profileSlice.actions;
export default profileSlice.reducer;