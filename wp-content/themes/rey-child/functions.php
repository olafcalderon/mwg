<?php
/**
 * Theme functions and definitions.
 * This child theme is purposed to Rey Theme
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 */
/*
	* If your child theme has more than one .css file (eg. ie.css, style.css, main.css) then
	* you will have to make sure to maintain all of the parent theme dependencies.
	*
	* Make sure you're using the correct handle for loading the parent theme's styles.
	* Failure to use the proper tag will result in a CSS file needlessly being loaded twice.
	* This will usually not affect the site appearance, but it's inefficient and extends your page's loading time.
	*
	* @link https://codex.wordpress.org/Child_Themes
	*/
/**
 * Load styles
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'rey-wp-style', get_template_directory_uri() . '/style.css', false, wp_get_theme()->parent()->get('Version') );
	wp_enqueue_style( 'rey-wp-style-child', get_stylesheet_uri() );
} );

add_filter( 'woocommerce_before_add_to_cart_quantity' , 'cust_order_or_provide' );

// Our hooked in function - $fields is passed via the filter!
function cust_order_or_provide( $fields ) {
	print_r($fields);
	return $fields;

/*
	$fields['shipping']['shipping_phone'] = array(
		'label' => __('Phone', 'woocommerce'),
		'placeholder' => _x('Phone', 'placeholder', 'woocommerce'),
		'required' => false,
		'class' => array('form-row-wide'),
		'clear' => true
	);

	return $fields;
*/
}