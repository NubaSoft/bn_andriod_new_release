import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// إعداد Reactotron
Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'BN App' }) // اسم المشروع اللي هيظهر في Reactotron
  .useReactNative() // تفعيل إضافات React Native (مثل الشبكة، الصور، إلخ)
  .connect(); // اتصال بالتطبيق على الكمبيوتر

// نعمل alias علشان نقدر نستخدمه في أي مكان:
console.tron = Reactotron;

// نمسح اللوجات القديمة في كل تشغيل
Reactotron.clear();
