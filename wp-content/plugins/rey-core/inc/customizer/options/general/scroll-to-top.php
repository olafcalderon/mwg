<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly

$section = 'scroll_to_top';

ReyCoreKirki::add_section($section, [
	'title'          => esc_html__('Scroll to top button', 'rey-core'),
	'priority'       => 130,
	'panel'			 => 'general_options',
]);

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'select',
	'settings'    => 'scroll_to_top__enable',
	'label'       => esc_html__( 'Select style', 'rey-core' ),
	'section'     => $section,
	'default'     => '',
	'choices'     => [
		'' => esc_html__( 'Disabled', 'rey-core' ),
		'style1' => esc_html__( 'Style #1 - Minimal', 'rey-core' ),
		'style2' => esc_html__( 'Style #2 - Box', 'rey-core' ),
	],
] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'text',
	'settings'    => 'scroll_to_top__text',
	'label'       => esc_html__( 'Button text', 'rey-core' ),
	'section'     => $section,
	'default'     => esc_html__('TOP', 'rey-core'),
	'input_attrs'     => [
		'placeholder' => esc_html__('eg: TOP', 'rey-core'),
	],
	'active_callback' => [
		[
			'setting'  => 'scroll_to_top__enable',
			'operator' => '!=',
			'value'    => '',
		],
	],
] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'color',
	'settings'    => 'scroll_to_top__color',
	'label'       => esc_html__( 'Button Color', 'rey-core' ),
	'section'     => $section,
	'default'     => '',
	'choices'     => [
		'alpha' => true,
	],
	'transport'   => 'auto',
	'output'      => [
		[
			'element'  		=> ':root',
			'property' 		=> '--scrolltotop-color',
		],
	],
	'active_callback' => [
		[
			'setting'  => 'scroll_to_top__enable',
			'operator' => '!=',
			'value'    => '',
		],
	],
] );
