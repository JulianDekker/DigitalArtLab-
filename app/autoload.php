<?php

use Doctrine\Common\Annotations\AnnotationRegistry;
use Composer\Autoload\ClassLoader;



/**
 * @var ClassLoader $loader
 */

$loader = require __DIR__.'/../vendor/autoload.php';
$classLoader = new \Doctrine\Common\ClassLoader('DoctrineExtensions', '/path/to/extensions');
$classLoader->register();
AnnotationRegistry::registerLoader(array($loader, 'loadClass'));

return $loader;
