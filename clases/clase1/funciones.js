// Modulo que saluda
var obj = {
	port: 10000,
	mail: 'nicopadilla@gmail.com',
	saludar : function(){
		console.log('HOla');
	},
	xmas : function(){
		var año = new Date().getFullYear()
		var Navidad=new Date(año,12,25)
		var hoy=new Date()
		var msParaNavidad=Navidad-hoy
		var diasParaNavidad=Math.floor(msParaNavidad/1000/60/60/24)

		console.log("Faltan "+diasParaNavidad+" dias para navidad")
	}
};

module.exports = obj;