module.exports = {
content: [
'./index.html',
'./src/**/*.{ts,tsx,js,jsx}'
],
theme: {
extend: {
colors: {
brand: {
50: '#eef7ff', 100: '#daedff', 200: '#b6dcff', 300: '#89c6ff',
400: '#5daeff', 500: '#318fff', 600: '#1e73f2', 700: '#185bd0',
800: '#174ba8', 900: '#163f86'
}
},
boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.08)' }
}
},
plugins: []
};