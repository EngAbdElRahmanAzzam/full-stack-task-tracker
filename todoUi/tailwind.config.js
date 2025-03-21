export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scaleY:"scale-y 1s linear infinite",
        meteor: "meteor 0.2s linear infinite",
        scaleUp: "scale-up4 1s linear infinite",  
      },
      keyframes: {
        "scale-up4": {  
          "20%": { transform: "scaleY(1.5)", backgroundColor: "#3f3c3c" },  
          "40%": { transform: "scaleY(1)" }, 
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "0" },
          "70%": { opacity: "100%" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "",
          },
          scaleY:{
            "0%": { width: "50px"},
            "100%": { width: "100%"},
          }
      }
    }
  },
  plugins: [],
  }
}
