<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'AASuScsUGQg/8FJzqtSMZIcCQw6Bd6V6QeJR0QaTOk9KucR1mf6XnpRhVKvtpAoJ0SLVj6h85NHgms7mzdNU7w==');
define('SECURE_AUTH_KEY',  'SXRaSYGgMcouVmMWTI/FlbJ4ln4fRZCnrS50pFAh1tmjY/w8xpHYENKu/WNK9Zi1NtXf/Ij4GjURF4zVoAv9Ww==');
define('LOGGED_IN_KEY',    '/LPvsHP72rlCZ9ldB6hiig4RSKmTUoY7L4Jfq2JYj+uY6RHkeL9W+EEghTVy0tNlrEN0FI2Zb4ML/vRrIH4ptQ==');
define('NONCE_KEY',        'XGJxciPSuph106+1bCBEgZ6QiZfig8OleDvTMGH/wNTzogNg0w/WNoUOdTkZYempxI1mBcUDmoy1nKvMDyq/2g==');
define('AUTH_SALT',        'lSdL34DFyxXyQwRvtXfRT+Rv/yPhdTZqDe0Zi7DKnj4xQEFrswC/1RQBhc0IWJP1Qsfgpex5E8iMKHOMUPnvhg==');
define('SECURE_AUTH_SALT', 'Ny9V/cxiH2pVwrWpMT27gUQ64F1W+y6dkgsSfyePexK+3Cyu6y1F2M6EdPbJRAqoU4HyvqsUTTQkYQfUitcSTg==');
define('LOGGED_IN_SALT',   'akFdvC4yvwBxlBwNgnaWRJs/3UnpOX7Hpk9d/JIpqbin+nd74MHdOjOQfMLW8dN5tfqe10XpJpCm1bjU8A4T8Q==');
define('NONCE_SALT',       'TwjrLrXJJ7mlJPnm93k8sIlVLCQSodAfDh2k2OoG8kkfIsdcuPZvDIQpkSy66XSFd4BoBF4/oiSgRRWpoG9clg==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
