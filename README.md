
🛒 E-commerce Full Stack

Descripción:

Este es un sistema completo de E-commerce, desarrollado con tecnologías modernas tanto en el frontend como en el backend. Ofrece funcionalidades esenciales como autenticación segura, gestión de productos, panel de administración, carrito de compras y un flujo completo de compra.




❓¿Qué problema resuelve?

Este proyecto está diseñado para digitalizar el proceso de ventas de cualquier negocio, permitiendo que sus productos lleguen a más personas sin necesidad de atención presencial. Automatiza el registro de usuarios, exhibe productos y facilita compras desde cualquier dispositivo con conexión.




🚀 Funcionalidades principales

✅ Registro e inicio de sesión con hash de contraseña (bcrypt)

🖼️ Subida de productos con imagen (Multer)

🏠 Home con productos destacados

🛒 Carrito de compras funcional

📦 Panel del vendedor para administrar productos

🧠 Panel del administrador para controlar el sistema



⚙️ Tecnologías utilizadas

Frontend:

React.js

Tailwind CSS

React Router

Framer Motion (animaciones)


Backend:

Node.js

Express.js

MySQL

bcrypt (hash de contraseñas)

Multer (gestión de archivos/imágenes)

CORS (conexión segura entre servidores)





🔐 ¿Cómo funciona el hasheo de contraseñas?

1. El usuario completa un formulario en React (nombre, email, contraseña).


2. Se envía la información al backend mediante POST.


3. En el servidor, la contraseña se encripta usando bcrypt con 10 saltos (salt rounds).


4. Se guarda en la base de datos solo la contraseña encriptada, jamás la original.


5. Durante el login, la contraseña ingresada se compara con el hash de la base de datos usando bcrypt.compare.






💡 Enfoque del Desarrollador

Programación modular y ordenada.

Pensamiento crítico para debugging eficiente.

Adaptabilidad a las necesidades reales del usuario.

UI dinámica e intuitiva, animada con Framer Motion.



---

👨‍💻 Desarrollado por:

AlanBenjaDev - Full Stack Developer


---