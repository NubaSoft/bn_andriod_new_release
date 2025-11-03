interface NavigationData {
  name: string
  params?: {}
}

type Screens =
  | {
      name: "IntroductionStack"
    }
  | {
      name: "AuthenticationStack"
    }
  | {
      name: "HomeStack"
    }
  | {
      name: "HomeDetailsStack"
    }
  | {
      name: "SubscriptionsStack"
    }
  | {
      name: "SubscriptionsDetailsStack"
    }
  | {
      name: "AccountStack"
    }
  | {
      name: "AccountDetailsStack"
    }

export type { NavigationData, Screens }
