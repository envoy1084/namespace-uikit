const demos = {
  alert: {
    action: "Upgrade",
    description: "Get a paid plan for more credits",
    title: "You have 2 credits left",
  },
  alertDialog: {
    description: "Do you want to save or discard changes?",
    discard: "Discard",
    save: "Save changes",
    title: "Unsaved changes",
  },
  allowNotifications: {
    description: "Receive push notifications from Namespace UIKit",
    label: "Allow notifications",
  },
  buttons: { clickMe: "Click me" },
  inputOtp: {
    description: "We've sent a code to a****@gmail.com",
    didntReceive: "Didn't receive a code?",
    label: "Verify account",
    resend: "Resend",
  },
  listBox: {
    actions: "Actions",
    ariaLabel: "File actions",
    dangerZone: "Danger zone",
    deleteFile: "Delete file",
    deleteFileDescription: "Move to trash",
    editFile: "Edit file",
    editFileDescription: "Make changes",
    newFile: "New file",
    newFileDescription: "Create a new file",
  },
  login: {
    continueWithApple: "Continue with Apple",
    continueWithGoogle: "Continue with Google",
    getStarted: "Get Started",
    or: "Or",
    title: "Create an account",
    trialNote: "Start your free 7-day trial. No credit card required.",
  },
  select: {
    label: "State",
    options: {
      california: "California",
      delaware: "Delaware",
      florida: "Florida",
      newYork: "New York",
      texas: "Texas",
      washington: "Washington",
    },
    placeholder: "Select one",
  },
  slider: { label: "Price" },
  subtleCards: {
    aiBy: "By Martha",
    aiMembers: "362 members",
    aiTitle: "AI Builders",
    indieBy: "By John",
    indieMembers: "148 members",
    indieTitle: "Indie Hackers",
  },
  tabs1: { all: "All", ariaLabel: "Options" },
  tabs2: { ariaLabel: "Options", chats: "Chats", emails: "Emails" },
  textfield: {
    description: "We won't share your email",
    error: "The email is invalid",
    label: "Your email",
    placeholder: "john@email.com",
  },
  uiComponents: {
    checkboxAriaLabel: "Checkbox Indicator Example",
    radioAriaLabel: "Radio Buttons Example",
    switchAriaLabel: "Switch On State Example",
  },
  xProfile: {
    bio: "Building accessible interfaces for the decentralized web.",
    bioSuffix: "Namespace UIKit",
    confettiLabel: "rocket",
    followers: "Followers",
    following: "Following",
  },
} as const;

export function useDictionary() {
  return { demos };
}
