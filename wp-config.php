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
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'olafc_mwg' );

/** MySQL database username */
define( 'DB_USER', 'olafc_mwg' );

/** MySQL database password */
define( 'DB_PASSWORD', '7pS22-.976' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'parwmtgmw5umfhpf4uwjy15bqmx8blwtnuifuwdc9t6yz7pggfapy0pmoxpzqylc' );
define( 'SECURE_AUTH_KEY',  'pxltunq8svwfqbhweo2wohwdexndwdazhfkrort5h8vccykfqtt4upvmvndlmlth' );
define( 'LOGGED_IN_KEY',    'y93qwe9mqnxexe7hbs3rxcmzeqbuhlvrxzjgx6rpyqpexjfv60lgrjp96twx4ny9' );
define( 'NONCE_KEY',        'f7iireaq4wjpi3axbgzy75rar6hoeitw5ewqxrcnjgmkieaa6njql9bhyh0tbeyv' );
define( 'AUTH_SALT',        'k3qdmhaudejfdsx4c2okhlth8tvzmrymnn75rtw2pp7vodzc5agrgypkbrota5lp' );
define( 'SECURE_AUTH_SALT', '4iqn7d3gyjnrvvvk4scd6jqqkesbu44o1ymgp8ux6awbetkawgg0u4dvpbi33n5n' );
define( 'LOGGED_IN_SALT',   '4tyyqreyv0kmtylquhfrxt9pplzgtz0xlpqykodbjiysla8rxqryyxuukag4tsp4' );
define( 'NONCE_SALT',       '6ivq1iiq9paebbddzjfrprlyttrllo4nm2dyvu9terjl1o5cvthjpgpm5rkcmtis' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wppc_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
