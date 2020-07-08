<?php
/**
 * Single Product tabs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/tabs.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 4.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Filter tabs and allow third parties to add their own.
 *
 * Each tab is an array containing title, callback and priority.
 * @see woocommerce_default_product_tabs()
 */
$blocks = apply_filters( 'woocommerce_product_tabs', array() );

if ( ! empty( $blocks ) ) :

	$blocks_class = '';

	if( array_key_exists('description', $blocks) ){
		$blocks_class = '--has-description';
	}

	$blocks_minus_reviews = $blocks;
	unset($blocks_minus_reviews['reviews']);
	$count_blocks = sprintf('--blocks-count:%d;', count($blocks_minus_reviews));

	?>
	<div class="rey-wcPanels <?php echo implode(' ', array_map('esc_attr', apply_filters('rey/woocommerce/product_panels_classes', []))) ?>" style="<?php esc_attr_e($count_blocks) ?>">
		<?php
		foreach ( $blocks as $key => $tab ):

			do_action('reycore/woocommerce/before_block_' . $key); ?>

			<div class="rey-wcPanel rey-wcPanel--<?php echo esc_attr( $key ); ?> <?php esc_attr_e($blocks_class); ?>">
				<?php
					if ( isset( $tab['callback'] ) ) {
						echo '<div class="rey-wcPanel-inner">';

						if( $key == 'reviews' && isset( $tab['title'] ) ) {
							printf( '<div class="rey-reviewsBtn btn btn-secondary-outline btn--block js-toggle-target"  data-target=".rey-wcPanel--reviews .woocommerce-Reviews"><span>%s</span></div>', $tab['title'] );
						}

						call_user_func( $tab['callback'], $key, $tab );

						echo '</div>';
					}

				?>
			</div>
			<?php
			do_action('reycore/woocommerce/after_block_' . $key);
		endforeach; ?>
	</div>

	<?php
	// deprecated
	do_action('reycore/woocommerce/before_blocks_review'); ?>

<?php endif; ?>
