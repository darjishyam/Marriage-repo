# How to Get `google-services.json` (Step-by-Step)

I cannot access your private Google account to do this for you. You must follow these steps exactly to make the "Real OTP" work.

## Phase 1: Create Project & Download File

1.  Open your browser and go to: **[https://console.firebase.google.com/](https://console.firebase.google.com/)**
2.  Sign in with your Google Account.
3.  Click **"Create a project"** (or "Add project").
    *   Enter Project Name: `HelloWorld`
    *   Click **Continue**.
    *   (Optional) Disable Google Analytics (makes it faster).
    *   Click **Create Project**.
4.  Once created, if you are not redirected, click **Project Overview** (House icon) in the top-left sidebar.
5.  You will see a text "Get started by adding Firebase to your app". Click the **Android Icon** (looks like a little robot) below it.
6.  **Critical Step**: In "Android package name", type **EXACTLY**:
    `com.helloworld.app`
7.  Click **Register app**.
8.  Click **Download google-services.json**.
9.  Save this file to your project folder:
    `d:\interview\HelloWorld - Copy\google-services.json`

## Phase 2: Enable Phone Auth

1.  In the Firebase Console, go to the left menu.
2.  Click **Build** -> **Authentication**.
3.  Click **Get started**.
4.  Click on **Native Providers** or **Sign-in method** tab.
5.  Click **Phone**.
6.  Switch the toggle to **Enable**.
7.  Click **Save**.
8.  (Optional) Click "Phone numbers for testing" to add a fake number like `+1 650-555-3434` with code `123456` for easier testing.

## Phase 3: Run the App

Back in your terminal ( VS Code):

```powershell
# 1. Stop existing server
Ctrl+C

# 2. Build the Android app (since we added native Firebase)
npx expo run:android
```
