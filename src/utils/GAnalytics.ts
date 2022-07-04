import { RouteLocationNormalized } from 'vue-router';

// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';


class GAnalytics {
   private static instance: GAnalytics;
   private analytics: Analytics;

   constructor() {
      if (GAnalytics.instance) {
         throw new Error('use GAnalytics.getInstance()');
      }

      // firebase config object
      const firebaseConfig: FirebaseOptions = {
         apiKey: import.meta.env.VITE_GA_APIKEY,
         authDomain: import.meta.env.VITE_GA_AUTHDOMAIN,
         projectId: import.meta.env.VITE_GA_PROJECTID,
         storageBucket: import.meta.env.VITE_GA_STORAGEBUCKET,
         messagingSenderId: import.meta.env.VITE_GA_MESSAGINGSENDERID,
         appId: import.meta.env.VITE_GA_APPID,
         measurementId: import.meta.env.VITE_GA_MEASUREMENTID,
      };

      const app = initializeApp(firebaseConfig);
      this.analytics = getAnalytics(app);
   }

   static getInstance(): GAnalytics {
      GAnalytics.instance = GAnalytics.instance || new GAnalytics();

      return GAnalytics.instance;
   }

   logRoute(to: RouteLocationNormalized) {
      logEvent(this.analytics, 'page_view', {
         page_path: to.path,
         page_location: to.fullPath,
      });
   }

   // logFlow(flowId: number) {
   //    logEvent(this.analytics, 'flow_view', {
   //       flow_id: flowId.toString(),
   //       ...((window.localStorage.getItem('entryId') && window.localStorage.getItem('entryId') !== '') && {
   //          entry_uuid: window.localStorage.getItem('entryId'),
   //       })
   //    })
   // }

   logCustomEvent(eventName: string, eventData: { [key: string]: any }) {
      logEvent(this.analytics, eventName, eventData);
   }
}

export default GAnalytics.getInstance();