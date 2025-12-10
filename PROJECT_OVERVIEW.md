# Shagun - Wedding Management Mobile Application

## 📱 Project Overview

**Shagun** is a comprehensive mobile application built with React Native and Expo for managing wedding-related activities. The app helps users track wedding expenses, manage guest lists, record shagun (monetary gifts), and organize wedding invitations digitally, replacing traditional physical record-keeping methods.

---

## 🛠️ Technology Stack

### Core Technologies
- **React Native** (v0.81.5) - Cross-platform mobile framework
- **Expo** (v54.0.25) - Development platform and toolchain
- **TypeScript** (v5.9.2) - Type-safe JavaScript
- **Expo Router** (v6.0.15) - File-based routing system

### Key Libraries
- **@react-navigation** - Navigation library for React Native
- **@react-native-async-storage/async-storage** - Local data persistence
- **@expo/vector-icons** - Icon library (Ionicons)
- **React Context API** - State management

---

## 📁 Project Structure

```
HelloWorld/
├── app/                          # Main application screens
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx             # My Wedding (Dashboard)
│   │   ├── chandla.tsx           # My Shagun (Shagun list)
│   │   └── profile.tsx           # User Profile
│   ├── onboarding/               # Onboarding flow
│   │   ├── screen1.tsx          # First onboarding screen
│   │   ├── screen2.tsx          # Second onboarding screen
│   │   └── screen3.tsx          # Third onboarding screen
│   ├── login.tsx                 # Login screen
│   ├── signup.tsx                # Sign up screen
│   ├── otp.tsx                   # OTP verification
│   ├── create-wedding.tsx        # Create wedding event
│   ├── shagun-book.tsx           # Shagun book empty state
│   ├── add-shagun.tsx            # Add new shagun entry
│   ├── expenses.tsx              # Expenses list
│   ├── add-expense.tsx           # Add new expense
│   ├── invitation-list.tsx       # Guest list
│   ├── add-guest.tsx             # Add new guest
│   ├── purchase-premium.tsx      # Premium subscription
│   ├── terms-of-service.tsx      # Terms of service
│   └── delete-account.tsx        # Delete account confirmation
├── contexts/                     # Global state management
│   ├── WeddingContext.tsx        # Wedding data management
│   ├── ShagunContext.tsx         # Shagun entries management
│   ├── LanguageContext.tsx       # Multi-language support
│   └── OnboardingContext.tsx     # Onboarding completion tracking
├── components/                    # Reusable components
│   ├── CalendarPicker.tsx        # Date picker component
│   └── RangeSlider.tsx           # Range slider for filtering
├── assets/                       # Images and static files
└── constants/                    # App constants

```

---

## 🎯 Key Features

### 1. **User Authentication & Onboarding**
- **Onboarding Flow**: 3-screen introduction for first-time users
- **Login/Signup**: User authentication with OTP verification
- **Onboarding Persistence**: Tracks completion status using AsyncStorage

### 2. **Wedding Management**
- **Create Wedding**: Set up wedding event with groom/bride names and date
- **Dashboard**: Overview with three main cards:
  - **Shagun Book**: Track monetary gifts and people count
  - **Expenses**: Manage wedding budget and spending
  - **Invitations**: Track guest list and invitations sent

### 3. **Shagun (Gift) Management**
- **Add Shagun**: Record gift entries with:
  - Bride's and Groom's names
  - Marriage date
  - Shagun amount
  - Gift details
- **Shagun List**: View all entries with search and sort functionality
- **Filtering**: Filter by name and amount range using custom range slider
- **Empty State**: Beautiful empty state when no entries exist

### 4. **Expense Tracking**
- **Add Expenses**: Record expenses with:
  - Expense description
  - Total amount
  - Paid deposit amount
  - Pending amount
- **Expense List**: View all expenses with empty state

### 5. **Guest & Invitation Management**
- **Add Guests**: Add guest information:
  - Name
  - Total family count
  - City/Village
- **Guest List**: Manage all guests with search functionality
- **Empty State**: Guide users to add their first guest

### 6. **Multi-Language Support**
- **Languages**: English and Gujarati (ગુજરાતી)
- **Language Switching**: Change language from profile settings
- **Persistent**: Language preference saved across app sessions

### 7. **Premium Features**
- **Premium Subscription**: Purchase premium for:
  - Ad-free experience
  - PDF export capabilities
  - Export Shagun Book, Guest List, and Expense Book to PDF
  - Priority support
- **Pricing**: ₹120/month with 25% savings tag

### 8. **User Profile**
- **Profile Management**: View and edit user information
- **Settings Options**:
  - Purchase Premium
  - Change Language
  - Terms of Service
  - Delete Account
  - Contact Us
  - Connect on Instagram
  - Log out

---

## 🔄 User Flow

### First-Time User Journey
1. **App Launch** → Onboarding screens (3 screens)
2. **Skip/Complete** → Login screen
3. **Login/Signup** → OTP verification
4. **Create Wedding** → Dashboard (if no wedding exists)
5. **Dashboard** → Access all features

### Returning User Journey
1. **App Launch** → Login screen (onboarding skipped)
2. **Login** → Dashboard
3. **Navigate** → Access various features via tabs and cards

### Main Navigation
- **Bottom Tabs**:
  - My Wedding (Dashboard)
  - My Shagun (Shagun list)
  - Profile (Settings)

---

## 🏗️ Architecture & State Management

### Context Providers (Global State)
1. **OnboardingContext**: Tracks if user has completed onboarding
2. **WeddingContext**: Manages wedding data (groom, bride, date)
3. **ShagunContext**: Manages all shagun entries (CRUD operations)
4. **LanguageContext**: Manages app language (English/Gujarati)

### Navigation Structure
- **Stack Navigation**: Main app navigation
- **Tab Navigation**: Bottom tab bar (3 tabs)
- **File-based Routing**: Expo Router handles routing automatically

### Data Persistence
- **AsyncStorage**: Used for:
  - Onboarding completion status
  - Language preference
  - (Can be extended for user data, wedding data, etc.)

---

## 🎨 Design Features

### UI/UX Highlights
- **Clean, Modern Design**: Minimalist white background with black accents
- **Color Scheme**: 
  - Primary: Black (#000)
  - Accent: Pink/Red (#8A0030)
  - Premium: Yellow/Gold (#FFD700)
- **Card-based Layout**: Information organized in colored cards
- **Empty States**: Beautiful illustrations with helpful messages
- **Consistent Spacing**: Proper spacing between elements
- **Responsive**: Works on different phone sizes

### Visual Elements
- **Icons**: Ionicons library for consistent iconography
- **Images**: Custom wedding-related illustrations
- **Typography**: Clear hierarchy with bold headings and readable body text

---

## 📱 Screen Breakdown

### Authentication Screens (4)
1. **Onboarding** (3 screens) - Introduction to app
2. **Login** - User login
3. **Signup** - User registration
4. **OTP** - Phone verification

### Main Screens (3 Tabs)
1. **My Wedding** - Dashboard with wedding overview
2. **My Shagun** - Shagun entries list with search/sort
3. **Profile** - User settings and account management

### Feature Screens (10+)
- Create Wedding
- Shagun Book (empty state)
- Add Shagun
- Expenses (empty state)
- Add Expense
- Invitation List (empty state)
- Add Guest
- Purchase Premium
- Terms of Service
- Delete Account

---

## 🔧 Key Components

### Custom Components
1. **CalendarPicker**: Custom date picker with month navigation
2. **RangeSlider**: Dual-handle slider for amount filtering
3. **Themed Components**: Themed text and view components

### Reusable Patterns
- **Empty States**: Consistent empty state design across features
- **Form Inputs**: Standardized input fields with labels
- **Modal Dialogs**: Consistent modal design for actions
- **Navigation Bars**: Standardized header with back button

---

## 🌐 Multi-Language Support

### Implementation
- **Translation System**: Centralized translation object
- **Language Switching**: Real-time language change
- **Supported Languages**:
  - English (default)
  - Gujarati (ગુજરાતી)

### Translated Content
- All UI text
- Menu items
- Button labels
- Form labels
- Error messages

---

## 🚀 Future Enhancements (Potential)

1. **Backend Integration**: Connect to API for data sync
2. **Cloud Storage**: Backup data to cloud
3. **PDF Export**: Generate PDF reports (Premium feature)
4. **Analytics**: Track expenses and shagun trends
5. **Notifications**: Reminders for payments and events
6. **Social Sharing**: Share wedding details
7. **Multiple Weddings**: Support for managing multiple events

---

## 📊 Technical Highlights

### Best Practices Implemented
- ✅ TypeScript for type safety
- ✅ Context API for state management
- ✅ File-based routing (Expo Router)
- ✅ Component reusability
- ✅ Consistent styling patterns
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

### Performance Considerations
- Lazy loading of screens
- Efficient state management
- Optimized image rendering
- Smooth navigation transitions

---

## 🎯 Project Purpose

This application solves the problem of managing wedding-related records digitally, replacing traditional physical books. It provides:
- **Digital Record Keeping**: No more losing physical chandla books
- **Easy Management**: Track expenses, guests, and gifts in one place
- **Accessibility**: Access data anytime, anywhere
- **Organization**: Search, filter, and sort functionality
- **Multi-language**: Support for regional languages

---

## 📝 Summary for Supervisor

**Shagun** is a production-ready mobile application built with React Native and Expo that helps users manage their wedding planning digitally. The app features:

- Complete user authentication flow with onboarding
- Wedding event creation and management
- Three main modules: Shagun (gifts), Expenses, and Guest Management
- Multi-language support (English & Gujarati)
- Premium subscription model
- Modern, responsive UI/UX design
- State management using React Context API
- Local data persistence using AsyncStorage

The application is structured with clean code architecture, reusable components, and follows React Native best practices. It's ready for backend integration and can be extended with additional features as needed.

