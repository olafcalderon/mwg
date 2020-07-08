<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly

if( !class_exists('ReyCore_OffcanvasPanels') ):

class ReyCore_OffcanvasPanels
{
	private $settings = [];

	public function __construct()
	{
		add_filter( 'reycore/global_sections/types', [$this, 'add_gs_support']);
		add_action( 'reycore/global_section_template/after_content', [$this, 'add_gs_notices']);
		add_action( 'wp_ajax_reycore_offcanvas_panel', [$this, 'get_offcanvas_panel_content']);
		add_action( 'wp_ajax_nopriv_reycore_offcanvas_panel', [$this, 'get_offcanvas_panel_content']);
		add_action( 'init', [$this, 'init'] );
	}

	public function init()
	{
		if( ! $this->is_enabled() ){
			return;
		}

		$this->set_settings();

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action(	'wp_footer', [$this, 'add_wrapper_template']);
	}

	private function set_settings(){
		$this->settings = apply_filters('reycore/module/offcanvas_panels/settings', []);
	}

	public function add_gs_support( $gs ){
		$gs['offcanvas']  = __( 'Off-Canvas Panel', 'rey-core' );
		return $gs;
	}

	/**`
	 * Add Global section text notices to describe.
	 *
	 */
	public function add_gs_notices(){

		if( class_exists('ReyCore_GlobalSections') && get_post_type() === ReyCore_GlobalSections::POST_TYPE ):
			$html = '';

			$gs_type = reycore__acf_get_field('gs_type', get_the_ID(), 'generic');

			if( $gs_type === 'offcanvas' ){
				$html = '<div class="rey-pbTemplate--gs-notice elementor-edit-area">' . __('Please click on the <span class="rey-openPageSettings">Page Settings <i class="eicon-cog" aria-hidden="true"></i></span> (bottom left corner) of the screen to adjust this preview\'s Width & Background Color.', 'rey-core') . '</div>';
			}

			echo $html;
		endif;

	}

	public function enqueue_scripts(){
		wp_enqueue_style( 'reycore-offcanvas-panels', REY_CORE_MODULE_URI . basename(__DIR__) . '/style.css', [], REY_CORE_VERSION );
		wp_enqueue_script( 'reycore-offcanvas-panels', REY_CORE_MODULE_URI . basename(__DIR__) . '/script.js', ['animejs', 'rey-script', 'reycore-scripts'], REY_CORE_VERSION , true);
	}

	/**
	 * Checks if there are published Off-canvas panel global sections
	 */
	public function is_enabled() {
		return class_exists('ReyCore_GlobalSections') && ($offcanvas_panels = ReyCore_GlobalSections::get_global_sections('offcanvas')) && !empty($offcanvas_panels);
	}

	function add_wrapper_template(){
		?>
		<script type="text/html" id="tmpl-reycore-offcanvas-tpl">
			<div class="rey-offcanvas-wrapper --loading" data-transition="{{data.transition}}" data-position="{{data.position}}" data-gs-id="{{data.gs}}" data-id="{{data.id}}" data-close-position="{{data.close_position}}">
				<div class="rey-offcanvas-contentWrapper">
					<button class="rey-offcanvas-close" >
						<# if ( data.close_position === 'text' || data.close_position === 'textout' ) { #>
							<span class="rey-offcanvas-closeText">{{data.close_text}}</span>
						<# } #>
						<# if ( data.close_position === 'inside' || data.close_position === 'outside' ) { #>
							<?php echo reycore__get_svg_icon(['id' => 'rey-icon-close', 'class' => 'icon-close']) ?>
						<# } #>
					</button>
					<div class="rey-offcanvas-content"></div>
				</div>
				<div class="rey-lineLoader"></div>
			</div>
		</script>
		<?php
	}

	function get_offcanvas_panel_content(){

		if( ! (isset($_POST['gs']) && ($gs = absint($_POST['gs']))) ){
			wp_send_json_error(esc_html__('Missing Global Section.', 'rey-core'));
		}

		if( ! class_exists('ReyCore_GlobalSections') ){
			wp_send_json_error(esc_html__('Elementor is disabled?', 'rey-core'));
		}

		// check if GS && get_field gs is panel

		if( $content = ReyCore_GlobalSections::do_section( $gs ) ){
			wp_send_json_success($content);
		}

		wp_send_json_error(esc_html__('Couldn\'t retrieve content.', 'rey-core'));

	}

}

new ReyCore_OffcanvasPanels;

endif;
