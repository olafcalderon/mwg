<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

add_filter('reycore/kirki_fields/field=preloader_color', function($args){
	$args['active_callback'][] = [
		'setting'  => 'header_prl_type',
		'operator' => 'in',
		'value'    => [
			'',
			'spinner-1',
			'spinner-2',
			'spinner-3',
			'spinner-4',
			'spinner-5',
			'spinner-6',
			'spinner-7',
			'spinner-8',
			'text-1',
			'text-2',
			'text-3',
		],
	];

	return $args;
});

add_action('reycore/customizer/init', function(){

	ReyCoreKirki::add_field( 'rey_core_kirki', [
		'type'        => 'select',
		'settings'    => 'header_prl_type',
		'label'       => esc_html__( 'Preloader Type', 'rey-module-preloaders' ),
		'section'     => 'site_preloader_options',
		'default'     => '',
		'priority'    => 20,
		'choices'     => [
			'' => esc_html__( 'Default', 'rey-module-preloaders' ),
			'spinner-1' => esc_html__( 'Spinner #1 (Classic Circle Spinner)', 'rey-module-preloaders' ),
			'spinner-2' => esc_html__( 'Spinner #2 (Circle Spinners)', 'rey-module-preloaders' ),
			'spinner-3' => esc_html__( 'Spinner #3 (Comic spinner)', 'rey-module-preloaders' ),
			'spinner-4' => esc_html__( 'Spinner #4 (Flipping Box)', 'rey-module-preloaders' ),
			'spinner-5' => esc_html__( 'Spinner #5 (Vertical Bars)', 'rey-module-preloaders' ),
			'spinner-6' => esc_html__( 'Spinner #6 (Unfolding Cube)', 'rey-module-preloaders' ),
			'spinner-7' => esc_html__( 'Spinner #7 (Skewed Line)', 'rey-module-preloaders' ),
			'spinner-8' => esc_html__( 'Spinner #8 (Circle & image inside)', 'rey-module-preloaders' ),
			'text-1' => esc_html__( 'Text #1 (Blurry Text)', 'rey-module-preloaders' ),
			'text-2' => esc_html__( 'Text #2 (Sliding Letters)', 'rey-module-preloaders' ),
			'text-3' => esc_html__( 'Text #3 (Stamp)', 'rey-module-preloaders' ),
			'text-4' => esc_html__( 'Text #4 (Colored Gradient Text)', 'rey-module-preloaders' ),
			// 'text-4' => esc_html__( 'Scrolling Big text', 'rey-module-preloaders' ),
			'image-1' => esc_html__( 'Image (Fade In Out)', 'rey-module-preloaders' ),
			'image-2' => esc_html__( 'Image (Gradient Fade)', 'rey-module-preloaders' ),
		],
		'active_callback' => [
			[
				'setting'  => 'site_preloader',
				'operator' => '==',
				'value'    => true,
			],
		],
	] );

	ReyCoreKirki::add_field( 'rey_core_kirki', [
		'type'        => 'image',
		'settings'    => 'header_prl_image',
		'label'       => esc_html__( 'Select Image', 'rey-module-preloaders' ),
		'section'     => 'site_preloader_options',
		'default'     => '',
		'priority'    => 20,
		'choices'     => [
			'save_as' => 'id',
		],
		'active_callback' => [
			[
				'setting'  => 'site_preloader',
				'operator' => '==',
				'value'    => true,
			],
			[
				'setting'  => 'header_prl_type',
				'operator' => 'in',
				'value'    => [
					'spinner-8',
					'text-3',
					'image-1',
					'image-2',
				],
			]
		],
	] );

	ReyCoreKirki::add_field( 'rey_core_kirki', [
		'type'     => 'text',
		'settings' => 'header_prl_text',
		'label'    => esc_html__( 'Text', 'rey-module-preloaders' ),
		'section'  => 'site_preloader_options',
		'default'  => esc_html__( 'LOADING', 'rey-module-preloaders' ),
		'priority' => 30,
		'active_callback' => [
			[
				'setting'  => 'site_preloader',
				'operator' => '==',
				'value'    => true,
			],
			[
				'setting'  => 'header_prl_type',
				'operator' => 'in',
				'value'    => [
					'text-1',
					'text-2',
					'text-3',
					'text-4',
				],
			]
		],
	] );

	ReyCoreKirki::add_field('rey_core_kirki', array(
		'type'        => 'typography',
		'settings'    => 'header_prl_text_typo',
		'label'       => esc_attr__('Text Typography', 'rey-module-preloaders'),
		'section'     => 'site_preloader_options',
		'default'     => array(
			'font-family'      => '',
			'font-size'      => '',
			'line-height'    => '',
			'letter-spacing' => '',
			'text-transform' => '',
			'font-weight' => '',
			'variant' => '',
		),
		'output' => array(
			array(
				'element' => '.rey-sitePreloader .rey-sitePreloader-text',
			),
		),
		'load_choices' => true,
		'priority' => 40,
		'active_callback' => [
			[
				'setting'  => 'site_preloader',
				'operator' => '==',
				'value'    => true,
			],
			[
				'setting'  => 'header_prl_type',
				'operator' => 'in',
				'value'    => [
					'text-1',
					'text-2',
					'text-3',
					'text-4',
				],
			]
		],
	));

});
