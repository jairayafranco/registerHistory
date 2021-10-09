/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.21-MariaDB : Database - users
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`users` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `users`;

/*Table structure for table `companias` */

DROP TABLE IF EXISTS `companias`;

CREATE TABLE `companias` (
  `id` int(2) NOT NULL,
  `tipo_usuario` varchar(128) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `companias` */

insert  into `companias`(`id`,`tipo_usuario`,`descripcion`) values (1,'Administrador','Jefe del departamento'),(2,'Desarrollo','Lider de los desarrollos '),(3,'Diseño','Encaregado de generar las estructuras y diseños de los aplicativos');

/*Table structure for table `proyectos` */

DROP TABLE IF EXISTS `proyectos`;

CREATE TABLE `proyectos` (
  `id` int(3) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_compania` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_proyectos` (`id_compania`),
  CONSTRAINT `FK_proyectos` FOREIGN KEY (`id_compania`) REFERENCES `companias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `proyectos` */

insert  into `proyectos`(`id`,`descripcion`,`id_compania`) values (1,'Proyecto de administrador',1);

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(30) CHARACTER SET utf8 NOT NULL,
  `clave` varchar(130) CHARACTER SET utf8 NOT NULL,
  `nombres` varchar(100) CHARACTER SET utf8 NOT NULL,
  `apellidos` varchar(128) CHARACTER SET utf8 NOT NULL,
  `id_tipo_usuario` int(128) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuarios` (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`usuario`,`clave`,`nombres`,`apellidos`,`id_tipo_usuario`) values (2,'prueba@hotmail.com','202cb962ac59075b964b07152d234b70','Jefferson','Andres',2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
