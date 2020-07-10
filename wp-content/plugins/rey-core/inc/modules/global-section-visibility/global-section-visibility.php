<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly

if( !class_exists('ReyCore_GlobalSections_Visibility') ):

class ReyCore_GlobalSections_Visibility
{
	private $settings = [];

	public function __construct()
	{
		return;
		add_action( 'acf/init', [$this, 'add_fields'] );
		add_filter('reycore/elementor/gs_id', [$this, 'hide_gs'], 99);
	}

	public function init()
	{
		if( ! $this->is_enabled() ){
			return;
		}

		$this->set_settings();
	}

	private function set_settings(){
		$this->settings = apply_filters('reycore/module/global_sections_visibility', []);
	}

	public function is_enabled() {
		return false;
	}

	function maybe_hide_gs( $gs_id ){

		$start_date = get_field('start_date', $gs_id);
		$end_date = get_field('end_date', $gs_id);
		$status = get_field('show_per_login_status', $gs_id);

	}

	function hide_gs( $gs_id ){

		if( ! class_exists('ACF') ){
			return $gs_id;
		}

		if( $this->maybe_hide_gs( $gs_id ) ){
			return false;
		}

		return $gs_id;
	}

	function add_fields(){
		if( function_exists('acf_add_local_field_group') ):

			acf_add_local_field_group(array(
				'key' => 'group_5f058db5d6559',
				'title' => 'Global Section Visibility',
				'fields' => array(
					array(
						'key' => 'field_5f058df1520b4',
						'label' => 'Start Date',
						'name' => 'start_date',
						'type' => 'date_time_picker',
						'instructions' => 'Automatically show this global section when this date has started.',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'display_format' => 'd/m/Y g:i a',
						'return_format' => 'd/m/Y g:i a',
						'first_day' => 1,
					),
					array(
						'key' => 'field_5f058e27520b5',
						'label' => 'End Date',
						'name' => 'end_date',
						'type' => 'date_time_picker',
						'instructions' => 'Automatically hide this global section after this date.',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'display_format' => 'd/m/Y g:i a',
						'return_format' => 'd/m/Y g:i a',
						'first_day' => 1,
					),
					array(
						'key' => 'field_5f058ec8e3781',
						'label' => 'Show per login status',
						'name' => 'show_per_login_status',
						'type' => 'select',
						'instructions' => 'Select if you want to show this section to a specific group of users',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'choices' => array(
							'logged' => 'Only Logged-in users',
							'logged_out' => 'Logged-out (guest)',
						),
						'default_value' => array(
						),
						'allow_null' => 1,
						'multiple' => 0,
						'ui' => 0,
						'return_format' => 'value',
						'ajax' => 0,
						'placeholder' => '',
					),
				),
				'location' => array(
					array(
						array(
							'param' => 'post_type',
							'operator' => '==',
							'value' => 'rey-global-sections',
						),
					),
				),
				'menu_order' => 10,
				'position' => 'normal',
				'style' => 'default',
				'label_placement' => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen' => '',
				'active' => true,
				'description' => '',
			));

		endif;
	}

}

new ReyCore_GlobalSections_Visibility;

endif;
