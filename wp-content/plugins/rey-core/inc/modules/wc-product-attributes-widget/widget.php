<?php
/**
 * Product Categories Widget
 *
 * @version 1.6.9
 */

defined( 'ABSPATH' ) || exit;

class Rey_WC_Widget_Product_Categories extends WP_Widget {

	/**
	 * Category ancestors.
	 *
	 * @var array
	 */
	public $cat_ancestors;

	/**
	 * Current Category.
	 *
	 * @var bool
	 */
	public $current_cat;

	/**
	 * Constructor.
	 */
	public function __construct() {

		parent::__construct(
			'rey_woocommerce_product_categories', // Base ID
			__('Product Categ. & Attrs. (Rey)', 'rey-core'), // Name
			[
				'description' => __('A list of product categories and attributes.', 'rey-core'),
				'classname' => 'woocommerce rey-catWgt'
			]
		);

		$this->defaults = [
			'title'                   => __( 'Product categories', 'rey-core' ),
			'source'                  => 'product_cat',
			'count'                   => false,
			'hierarchical'            => false,
			'show_children_only'      => false,
			'orderby'                 => 'name',
			'hide_empty'              => true,
			'max_depth'               => '',
			'search_box'              => false,
			'accordion_list'          => false,
			'rey_multi_col'           => false,
			'show_checkboxes'         => false,
			'alphabetic_menu'         => false,
			'custom_height'           => '',
			'item_font_size'          => '',
			'back_to_shop' => 'no',
			'back_to_shop_text' => '',
			'show_only_on_categories' => []
		];
	}

	/**
	 * Output widget.
	 *
	 * @see WP_Widget
	 * @param array $args     Widget arguments.
	 * @param array $instance Widget instance.
	 */
	public function widget( $args, $instance ) {
		global $wp_query, $post;

		$instance = wp_parse_args( (array) $instance, $this->defaults );

		// bail if set to exclude on certain category
		if( !empty($instance['show_only_on_categories']) && is_tax( 'product_cat', $instance['show_only_on_categories'] ) ){
			return;
		}

		// Back button
		$back_to_shop_link = [];
		if( is_tax() && $instance['back_to_shop'] !== 'no' ){
			$back_to_shop_text = !empty($instance['back_to_shop_text']) ? $instance['back_to_shop_text'] : esc_html__('&laquo; Back to Shop', 'rey-core');
			$back_to_shop_link[$instance['back_to_shop']] = sprintf('<a href="%1$s" class="rey-catWgt-back">%2$s</a>', esc_url( get_permalink(wc_get_page_id('shop')) ), $back_to_shop_text);
		}

		wp_enqueue_style( 'reycore-product-catattr-widget');
		wp_enqueue_script( 'reycore-product-catattr-widget');

		$list_args          = [
			'show_count'      => $instance['count'],
			'hierarchical'    => $instance['hierarchical'],
			'taxonomy'        => $instance['source'],
			'hide_empty'      => $instance['hide_empty'],
			'alphabetic_menu' => $instance['alphabetic_menu'],
			'show_checkboxes' => $instance['show_checkboxes'],
			'accordion_list'  => $instance['accordion_list'],
		];

		$max_depth          = absint( $instance['max_depth'] );

		$list_args['menu_order'] = false;
		$list_args['depth']      = $max_depth;

		if ( 'order' === $instance['orderby'] ) {
			$list_args['orderby']      = 'meta_value_num';
			$list_args['meta_key']     = 'order';
		}

		// Get Categories
		if( $instance['source'] === 'product_cat' ){

			$this->current_cat   = false;
			$this->cat_ancestors = array();

			if ( is_tax( 'product_cat' ) ) {

				$this->current_cat   = $wp_query->queried_object;
				$this->cat_ancestors = get_ancestors( $this->current_cat->term_id, 'product_cat' );

			} elseif ( is_singular( 'product' ) ) {

				$terms = wc_get_product_terms(
					$post->ID,
					'product_cat',
					apply_filters(
						'woocommerce_product_categories_widget_product_terms_args',
						array(
							'orderby' => 'parent',
							'order'   => 'DESC',
						)
					)
				);

				if ( $terms ) {
					$main_term           = apply_filters( 'woocommerce_product_categories_widget_main_term', $terms[0], $terms );
					$this->current_cat   = $main_term;
					$this->cat_ancestors = get_ancestors( $main_term->term_id, 'product_cat' );
				}
			}

			// Show Siblings and Children Only.
			if ( $instance['show_children_only'] && $this->current_cat ) {
				if ( $hierarchical ) {

					$include = array_merge(
						$this->cat_ancestors,
						array( $this->current_cat->term_id ),
						get_terms(
							'product_cat',
							array(
								'fields'       => 'ids',
								'parent'       => 0,
								'hierarchical' => true,
								'hide_empty'   => false,
							)
						),
						get_terms(
							'product_cat',
							array(
								'fields'       => 'ids',
								'parent'       => $this->current_cat->term_id,
								'hierarchical' => true,
								'hide_empty'   => false,
							)
						)
					);
					// Gather siblings of ancestors.
					if ( $this->cat_ancestors ) {
						foreach ( $this->cat_ancestors as $ancestor ) {
							$include = array_merge(
								$include,
								get_terms(
									'product_cat',
									array(
										'fields'       => 'ids',
										'parent'       => $ancestor,
										'hierarchical' => false,
										'hide_empty'   => false,
									)
								)
							);
						}
					}
				} else {
					// Direct children.
					$include = get_terms(
						'product_cat',
						array(
							'fields'       => 'ids',
							'parent'       => $this->current_cat->term_id,
							'hierarchical' => true,
							'hide_empty'   => false,
						)
					);
				}

				$list_args['include']     = implode( ',', $include );

				if ( empty( $include ) ) {
					return;
				}

				$list_args['child_of']         = 0;
				$list_args['hierarchical']     = 1;
			}
		}

		// Custom CSS

		$css = '';

		if ( $font_size = absint($instance['item_font_size']) ) {
			$css .= 'font-size: '. $font_size .'px;';
		}

		if( $css ){
			$the_style = sprintf('<style>#%s .rey-catWgt-navlist li a {%s}</style>', $args['widget_id'], $css);
			$args['before_widget'] .= $the_style;
		}

		echo $args['before_widget']; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped

		$title = apply_filters( 'widget_title', $instance['title'], $instance, $this->id_base );

		if ( $title ) {
			echo $args['before_title'] . $title . $args['after_title']; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
		}

		if( isset($back_to_shop_link['before']) ){
			echo $back_to_shop_link['before'];
		}

		// Make list
		$list_args['walker']                     = new Rey_WC_Product_Cat_List_Walker();
		$list_args['title_li']                   = '';
		$list_args['pad_counts']                 = 1;
		$list_args['show_option_none']           = __( 'No product categories exist.', 'rey-core' );
		$list_args['current_category']           = ( $this->current_cat ) ? $this->current_cat->term_id : '';
		$list_args['current_category_ancestors'] = $this->cat_ancestors;
		$list_args['max_depth']                  = $max_depth;
		$list_args['echo']                       = false;

		$list_html = '';
		$list_classes = $list_wrapper_styles = $list_attributes = [];

		if( ! $list_args['accordion_list'] && ($custom_height = absint( $instance['custom_height'] )) ){
			$list_wrapper_styles[] = sprintf('height:%spx', $custom_height);
			$list_attributes[] = sprintf('data-height="%s"', $custom_height);
		}

		if( $list_args['hierarchical'] ){
			$list_classes[] = '--hierarchy';

			if( $list_args['accordion_list'] ){
				$list_classes[] = '--accordion';
			}
		}

		$list_classes[] = '--style-' . ($list_args['show_checkboxes'] ? 'checkboxes' : 'default');

		if( $list_args['alphabetic_menu'] ){
			$list_html .= sprintf(
				'<div class="rey-catWgt-alphabetic"><span class="rey-catWgt-alphabetic-all">%1$s</span></div>',
				esc_html__('All', 'rey-core')
			);
		}

		if( $instance['search_box'] ){
			$list_html .= '<div class="rey-catWgt-searchbox">';
			$list_html .= reycore__get_svg_icon__core(['id'=>'reycore-icon-search']);
			$taxonomy_object = get_taxonomy( $list_args['taxonomy'] );
			$searchbox_label = sprintf(esc_html__('Search %s', 'rey-core'), $taxonomy_object->label);
			$list_html .= sprintf('<input type="text" placeholder="%s">', $searchbox_label);
			$list_html .= '</div>';
		}

		$list_attributes[] = sprintf('data-taxonomy="%s"', esc_attr($list_args['taxonomy']));

		$list_html .= sprintf('<div class="rey-catWgt-nav %s" %s>', implode(' ', $list_classes), implode(' ', $list_attributes));

			$list_html .= sprintf('<div class="rey-catWgt-navInner" style="%s">', implode(' ', $list_wrapper_styles));
				$list_html .= '<ul class="rey-catWgt-navlist">';
					$list_html .= wp_list_categories( apply_filters( 'rey_woocommerce_product_categories_widget_args', $list_args ) );
				$list_html .= '</ul>';
			$list_html .= '</div>';

			if( ! $list_args['accordion_list'] && $custom_height ){
				$list_html .= '<span class="rey-catWgt-customHeight-all">'. esc_html__('Show All +', 'rey-core') .'</span>';
			}

			if( isset($back_to_shop_link['after']) ){
				echo $back_to_shop_link['after'];
			}

		$list_html .= '</div>';

		echo $list_html;
		echo $args['after_widget']; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}


	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form($instance) {

		$instance = wp_parse_args( (array) $instance, $this->defaults );

		$archive_taxonomies = [
			'product_cat' => esc_html__('Product Categories', 'rey-core')
		];

		$attribute_taxonomies = wc_get_attribute_taxonomies();

		foreach ( $attribute_taxonomies as $attribute ) {
			if( (bool) $attribute->attribute_public ){
				$wc_taxonomy = wc_attribute_taxonomy_name( $attribute->attribute_name );
				$archive_taxonomies[$wc_taxonomy] = $attribute->attribute_label . esc_html__(' (public taxonomy)', 'rey-core');
			}
		}
		?>

		<div class="rey-widgetTabs-wrapper">

			<div class="rey-widgetTabs-buttons">
				<span data-tab="basic" class="--active"><?php esc_html_e('Basic options', 'rey-core') ?></span>
				<span data-tab="style"><?php esc_html_e('Styles', 'rey-core') ?></span>
				<span data-tab="advanced"><?php esc_html_e('Advanced', 'rey-core') ?></span>
			</div>

			<div class="rey-widgetTabs-tabContent --active" data-tab="basic">

				<?php

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'title',
					'type' => 'text',
					'label' => __( 'Title', 'rey-core' ),
					'value' => '',
					'field_class' => 'widefat'
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'source',
					'type' => 'select',
					'label' => __( 'Source', 'rey-core' ),
					'field_class' => 'widefat',
					'value' => 'product_cat',
					'options' => $archive_taxonomies
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'count',
					'type' => 'checkbox',
					'label' => __( 'Show count', 'rey-core' ),
					'value' => '1',
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'hierarchical',
					'type' => 'checkbox',
					'label' => __( 'Show hierarchy', 'rey-core' ),
					'value' => '1',
					'conditions' => [
						[
							'name' => 'source',
							'value' => 'product_cat',
							'compare' => '=='
						],
					]
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'show_children_only',
					'type' => 'checkbox',
					'label' => __( 'Only show children of the current category', 'rey-core' ),
					'value' => '1',
					'conditions' => [
						[
							'name' => 'source',
							'value' => 'product_cat',
							'compare' => '=='
						],
					]
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'hide_empty',
					'type' => 'checkbox',
					'label' => __( 'Hide empty', 'rey-core' ),
					'value' => '1',
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'max_depth',
					'type' => 'number',
					'label' => __( 'Maximum Depth', 'rey-core' ),
					'value' => '',
					'field_class' => 'small-text',
					'options' => [
						'step' => 1,
						'min' => 1,
						'max' => 10,
					],
					'conditions' => [
						[
							'name' => 'source',
							'value' => 'product_cat',
							'compare' => '=='
						],
					]
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'back_to_shop',
					'type' => 'select',
					'label' => __( '"Back to Shop" link', 'rey-core' ),
					'field_class' => 'widefat',
					'value' => 'no',
					'options' => [
						'no' => esc_html__('No', 'rey-core'),
						'before' => esc_html__('Yes - Before menu', 'rey-core'),
						'after' => esc_html__('Yes - After menu', 'rey-core'),
					]
				]);

				reyajaxfilter_widget__option( $this, $instance, [
					'name' => 'back_to_shop_text',
					'type' => 'text',
					'label' => __( '"Back to Shop" text', 'rey-core' ),
					'value' => '',
					'conditions' => [
						[
							'name' => 'back_to_shop',
							'value' => 'no',
							'compare' => '!='
						],
					],
					'placeholder' => esc_html__('eg: Back to shop', 'rey-core')
				]);

				?>
			</div>
			<!-- end tab -->

			<div class="rey-widgetTabs-tabContent" data-tab="style">

				<?php

					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'show_checkboxes',
						'type' => 'checkbox',
						'label' => __( 'Show checkboxes', 'rey-core' ),
						'value' => '1',
					]);

					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'search_box',
						'type' => 'checkbox',
						'label' => __( 'Show search (filter) field', 'rey-core' ),
						'value' => '1',
					]);

					// reyajaxfilter_widget__option( $this, $instance, [
					// 	'name' => 'rey_multi_col',
					// 	'type' => 'checkbox',
					// 	'label' => __( 'Display list on 2 columns', 'rey-core' ),
					// 	'value' => '1',
					// 	'conditions' => [
					// 		[
					// 			'name' => 'hierarchical',
					// 			'value' => true,
					// 			'compare' => '!='
					// 		],
					// 	]
					// ]);

					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'accordion_list',
						'type' => 'checkbox',
						'label' => __( 'Display list as accordion', 'rey-core' ),
						'value' => '1',
						'conditions' => [
							[
								'name' => 'hierarchical',
								'value' => true,
								'compare' => '=='
							],
							[
								'name' => 'show_children_only',
								'value' => true,
								'compare' => '!='
							],
						]
					]);

					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'alphabetic_menu',
						'type' => 'checkbox',
						'label' => __( 'Show alphabetic menu', 'rey-core' ),
						'value' => '1',
					]);

					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'custom_height',
						'type' => 'number',
						'label' => __( 'Custom Height', 'rey-core' ),
						'value' => '',
						'field_class' => 'small-text',
						'options' => [
							'step' => 1,
							'min' => 50,
							'max' => 1000,
						],
						'conditions' => [
							[
								'name' => 'accordion_list',
								'value' => true,
								'compare' => '!='
							],
						],
						'suffix' => 'px'
					]);

					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'item_font_size',
						'type' => 'number',
						'label' => __( 'Font Size', 'rey-core' ),
						'value' => '',
						'field_class' => 'small-text',
						'options' => [
							'step' => 1,
							'min' => 50,
							'max' => 1000,
						],
						'suffix' => 'px'
					]);

				?>

			</div>
			<!-- end tab -->

			<div class="rey-widgetTabs-tabContent" data-tab="advanced">

				<?php
					reyajaxfilter_widget__option( $this, $instance, [
						'name' => 'show_only_on_categories',
						'type' => 'select',
						'multiple' => true,
						'label' => __( 'Display widget on certain categories:', 'rey-core' ),
						'wrapper_class' => '--stretch',
						'options' => reycore_wc__product_categories()
					]);
				?>

			</div>
			<!-- end tab -->

		</div>

		<?php
			reyajaxfilters__filter_admin_titles( $instance['show_only_on_categories'] );
	}

	public function update($new_instance, $old_instance) {

		$instance['title']                   = sanitize_text_field($new_instance['title']);
		$instance['count']                   = !empty($new_instance['count']);
		$instance['hierarchical']            = !empty($new_instance['hierarchical']);
		$instance['show_children_only']      = !empty($new_instance['show_children_only']);
		$instance['source']                 = isset($new_instance['source']) ? sanitize_text_field($new_instance['source']) : $this->defaults['source'];
		$instance['orderby']                 = isset($new_instance['orderby']) ? sanitize_text_field($new_instance['orderby']) : $this->defaults['orderby'];
		$instance['hide_empty']              = !empty($new_instance['hide_empty']);
		$instance['max_depth']               = isset($new_instance['max_depth']) ? sanitize_text_field($new_instance['max_depth']) : '';
		$instance['search_box']              = !empty($new_instance['search_box']);
		$instance['accordion_list']          = !empty($new_instance['accordion_list']);
		$instance['show_checkboxes']         = !empty($new_instance['show_checkboxes']);
		$instance['alphabetic_menu']         = !empty($new_instance['alphabetic_menu']);
		$instance['custom_height']           = isset($new_instance['custom_height']) ? sanitize_text_field($new_instance['custom_height']) : '';
		$instance['item_font_size']          = isset($new_instance['item_font_size']) ? sanitize_text_field($new_instance['item_font_size']): '';
		$instance['back_to_shop']          = isset($new_instance['back_to_shop']) ? sanitize_text_field($new_instance['back_to_shop']): 'no';
		$instance['back_to_shop_text']          = isset($new_instance['back_to_shop_text']) ? sanitize_text_field($new_instance['back_to_shop_text']): '';
		// $instance['rey_multi_col']        = !empty($new_instance['rey_multi_col']);
		$instance['show_only_on_categories'] = !empty($new_instance['show_only_on_categories']) &&
			is_array($new_instance['show_only_on_categories']) ?
			array_map('sanitize_text_field', $new_instance['show_only_on_categories']) : [];

		return $instance;
	}
}

add_action( 'widgets_init', function () {
	register_widget( 'Rey_WC_Widget_Product_Categories' );
} );
