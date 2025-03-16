export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scaleUp: "scale-up4 1s linear infinite",  
      },
      keyframes: {
        "scale-up4": {  
          "20%": { transform: "scaleY(1.5)", backgroundColor: "#3f3c3c" },  
          "40%": { transform: "scaleY(1)" }, 
        }
      }
    }
  },
  plugins: [],
};
