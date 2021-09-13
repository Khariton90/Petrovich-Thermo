const ItemsPage = {
	template: 
	`<div class="windowWrapper">
	<p class="title">Количество окон</p>
<div class="walls__exterior">
	<div class="fake__select animation">
		
	</div>
	<select class="select" v-model="selected" @change="addwindow">
		<option v-for="n in 5" :value="n" > {{ n }} </option>
	</select>
</div>
<!-- Обертка для блоков ширины высоты -->
<div class="valuesWindows">
	<div class="window-item">
		<p class="title">Высота (м)</p>

	<div class="box">
		<div class="value">{{ valueHeight }}</div>
			<div class="slider"> 
				<input class="styled-slider slider-progress" type="range" min="1" max="30" value="15" v-model="valueH" @input="addwindow">
			</div>
	</div>

	</div>
	<div class="window-item">
		<p class="title">Ширина (м)</p>

		<div class="box">
		<div class="value">{{ valueWidth }}</div>
			<div class="slider"> 
				<input class="styled-slider slider-progress" type="range" min="1" max="30" value="15" v-model="valueW"   @input="addwindow">
			</div>
	</div>

	</div>
</div>

</div>
	`,
	props: ['windowstotal','index'],
	data(){
		return{
			valueComponent : '',
			selected: 1,
			valueW: 15,
			valueH: 15,
			total: '',
		}
	},
	methods: {
		addTotal(){
			this.total = (this.valueWidth * this.valueHeight) * this.selected;
		},
		async addwindow(){
			this.addTotal();
			this.$emit('addwindow', this.total, this.index)
		}
	},
	computed:{
		valueWidth(){
			return this.valueW / 10
		},
		valueHeight(){
			return this.valueH / 10
		},

	},
	mounted(){
		for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
			e.style.setProperty('--value', e.value);
			e.style.setProperty('--min', e.min == '' ? '0' : e.min);
			e.style.setProperty('--max', e.max == '' ? '100' : e.max);
			e.addEventListener('input', () => e.style.setProperty('--value', e.value));
		  }
	}
}

new Vue({
	el: '#app',
	data:{
			show: false,
			print: false,
			menu: false,
			valueHeight: 3000,
			counter: 1,
			defaultValueMaterial: 147,
			buttonsMaterial: [
			{ id:0, name: 'Алюминий', type: 'Alum', value: 147, active: true },
			{ id:1, name: 'Металл', type: 'Steel', value: 800, active: false },
			{ id:2, name: 'Биметалл', type: 'BM', value: 164, active: false },
			],
			// Models: [
			// 	{ id: 0, name: 'ATM THERMO', type: 'Alum', value: 114 },
			// 	{ id: 1, name: 'AXIS', type: 'Alum', value: 114 },
			// 	{ id: 2, name: 'FONDITAL', type: 'Alum', value: 114 },
			// 	{ id: 3, name: 'Gekon', type: 'Alum', value: 114 },
			// 	{ id: 4, name: 'Global', type: 'Alum', value: 114 },
			// 	{ id: 5, name: 'Irsap', type: 'Alum', value: 114 },
			// 	{ id: 6, name: 'KZTO', type: 'Alum', value: 114 },
			// 	{ id: 7, name: 'CTM', type: 'Alum', value: 114 },
			// 	{ id: 8, name: 'AXIS', type: 'Steel', value: 114 },
			// 	{ id: 9, name: 'Irsap', type: 'Steel', value: 114 },
			// 	{ id: 10, name: 'Purmo', type: 'Steel', value: 114 },
			// 	{ id: 11, name: 'ATM THERMO', type: 'BM', value: 114 },
			// 	{ id: 12, name: 'FONDITAL', type: 'BM', value: 114 },
			// 	{ id: 13, name: 'Global', type: 'BM', value: 114 },
			// 	{ id: 14, name: 'CTM', type: 'BM', value: 114 },
			// 	{ id: 15, name: 'Rifar', type: 'BM', value: 114 },
			// 	{ id: 16, name: 'Royal Thermo', type: 'BM', value: 114 }
			// ],
			TypeRadiator: 'Alum',
			CurrentModels: [],
			valuesHeight: [
				{ id: 0, height: 2500, value: 1.0 },
				{ id: 1, height: 2600, value: 1.0 },
				{ id: 2, height: 2700, value: 1.0 },
				{ id: 3, height: 2800, value: 1.05 },
				{ id: 4, height: 2900, value: 1.05 },
				{ id: 5, height: 3000, value: 1.05 },
				{ id: 6, height: 3100, value: 1.1 },
				{ id: 7, height: 3200, value: 1.1 },
				{ id: 8, height: 3300, value: 1.1 },
				{ id: 9, height: 3400, value: 1.1 },
				{ id: 10, height: 3500, value: 1.1 }
			],
			TypeArea: 'Многоэтажный дом',
			ValuesTypeArea : [
				{ id:1, name:'Многоэтажный дом', value: 'Многоэтажный дом'}, 
				{ id:2, name: 'Частный дом', value: false }
			],
			WallsExterior : [
				{ id:1, value: 1 },
				{ id:2, value: 1.2 },
				{ id:3, value: 1.3 },
				{ id:4, value: 1.4 }
			],
			//Количество наружных стен
			WallsInsulation : [
				{ id:1, dp: 'Стены утеплены согласно теплотехническим расчетам', value: 0.85 },
				{ id:2, dp: 'Стены не утеплены', value: 1.27 },
				{ id:3, dp: 'Стены в два кирпича, или поверхностное утепление', value: 1 },
			],
			RoomAbove: [
				{ id:1, dp: 'Отапливаемое помещение', value: 0.8 },
				{ id:2, dp: 'Утепленная кровля ( утепленный чердак )', value: 0.9 },
				{ id:3, dp: 'Неотапливаемое помещение либо холодный чердак', value: 1  }
			],
			TypeWindow: [
				{ id:1, dp: 'Деревянные рамы с двойным остеклением', value: 1.27 },
				{ id:2, dp: 'Однокамерный стеклопакет', value: 1 },
				{ id:3, dp: 'Двойной стеклопакет или с аргоновым заполнением', value: 0.85 }
			],
			ValuesConnecting: [
				{ id:0, src: './img/1.png', value: 1, active: true },
				{ id:1, src: './img/2.png', value: 1.03, active: false },
				{ id:2, src: './img/3.png', value: 1.13, active: false },
				{ id:3, src: './img/4.png', value: 1.25, active: false },
				{ id:4, src: './img/5.png', value: 1.28, active: false },
				{ id:5, src: './img/6.png', value: 1.28, active: false }
			],
			ValuesFeaturesInstallations: [
				{ id:1, dp: 'Расположен открыто и не прикрыт', value: 0.9 },
				{ id:2, dp: 'Прикрыт сверху подоконником или полкой', value: 1 },
				{ id:3, dp: 'Прикрыт сверху горизонтальным выступом ниши', value: 1.07 },
				{ id:4, dp: 'Прикрыт подоконником, а с фронтальной стороны кожухом', value: 1.12 },
				{ id:5, dp: 'Полностью прикрыт декоративным кожухом', value: 1.2 }
			],
			windowstotal : [2.25],
			newTotal: [],
			windowAll: 2.25,
			resultValues:{
			S: 50,
			// A Количество внешних стен
			A: 1.0,
			// B Ориентация помещения по сторонам света
			B: 1.1,
			// C Коэффициент утепленности стен
			C: 0.85,
			// D Особенности климатических условий региона
			D: 1.3,
			// E Коэффициент высоты потолков
			E: 1.05,
			// F Тип помещения расположенного выше
			F: 0.8,
			// G Коэффициент учета типа установленных окон
			G: 1.27,
			// H Коэффициент площади остекления помещения
			H: 0.045,
			// I Коэффициент учитывающий схему подключения радиатора
			I: 1.0,
			// J Коэффициент степени открытости радиатора
			J: 0.9,
			},
			windowArea: 0.045,
			allPower: '',
			valueSection: '',
			text : '',
			text2 : ''
		
	},
	components: {
		'items-page' : ItemsPage
	},
	methods:{
		mainSlider(e){
			let selector = this.$refs.selector;
			let slider = this.$refs.slider;
			let progressBar = this.$refs.progressBar;
			let minus = this.$refs.areaMinus;
			let plus = this.$refs.areaPlus;
			if(e.target == minus && this.resultValues.S > 0){
				slider.value--
				this.resultValues.S --
			}
			if(e.target == plus && this.resultValues.S < 100){
				slider.value++
				this.resultValues.S ++
			}
			selector.style.left = slider.value + '%';
			progressBar.style.width = slider.value + '%';
			this.resultValues.S = Number(slider.value);
			this.addwindow();
		},
		sliderHeight(e){
			let selectorHeight = this.$refs.selectorHeight;
			let sliderHeight = this.$refs.sliderHeight;
			let progressHeight = this.$refs.progressBarHeight;
			if(e.target == this.$refs.HeightMinus && this.valueHeight > 2500){
				sliderHeight.value--
			}
			if(e.target == this.$refs.HeightPlus && this.valueHeight < 3500){
				sliderHeight.value++
			}
			let sliderCoefficient = sliderHeight.value * 10;
			selectorHeight.style.left = sliderCoefficient + '%';
			progressHeight.style.width = sliderCoefficient + '%';
			this.valueHeight = this.valuesHeight[sliderHeight.value].height;
			this.cofficientHeight()
		},
		cofficientHeight(){
			let slide = this.$refs.sliderHeight.value;
			console.log(slide)
			if(slide <= 2){
				this.resultValues.E = 1;
			}else if(slide > 2 && slide < 6){
				this.resultValues.E = 1.05;
			}else if(slide >= 6){
				this.resultValues.E = 1.1;
			}
		},
		// Кнопки с материалом
		ChangeMaterial(id){
			this.buttonsMaterial.forEach(el => el.active = false)
			this.buttonsMaterial[id].active = true;
			this.defaultValueMaterial = this.buttonsMaterial[id].value;
			return this.TypeRadiator = this.buttonsMaterial[id].type
		},
		ChangeConnect(id){
			this.ValuesConnecting.forEach(el => el.active = false)
			this.ValuesConnecting[id].active = true;
			return this.resultValues.I = this.ValuesConnecting[id].value;
		},
		HelperModal(e){

		},
		// ModelsRadiator(){
		// 	return this.CurrentModels = this.Models.filter(model => model.type == this.TypeRadiator)
		// },
		addwindow(value, index){
			this.windowstotal[index] = value;
			let main = this.windowstotal.reduce((total, acc) => total += acc,0);
			this.windowAll = main;
			this.windowArea = this.windowAll / this.resultValues.S;
		},
		windowbutton(){
			this.counter++;
			this.windowstotal.push(2.25);
			this.windowAll += 2.25;
			this.addwindow();
		},
		winAll(){
			this.allPower = Math.ceil(Object.values(this.resultValues).reduce((total, acc) => total *= acc, 100));
			this.valueSection = Math.ceil(this.allPower / this.defaultValueMaterial);
			let section = this.$refs.section;
			let power = this.$refs.power;
			let footer = document.getElementById('footer');
			window.scrollTo({'behavior': 'smooth', 'top': footer.offsetTop})
		},
		preload(){
			let pre = this.$refs.preloader;
			setTimeout(() => {
				pre.classList.add('active')
			}, 2000);
			setTimeout(() => {
				this.show = true
			}, 3500);
		},
		menuToggle(){
			let description = this.$refs.description;
			description.classList.toggle('active');
			this.menu ? this.menu = false : this.menu = true
			document.body.classList.toggle('lock')
			if(this.menu){
				var tl = gsap.timeline({repeat: 0, delay: 0});
				tl.from('.blanc', {opacity: 0, x: 600, duration: 1.2});
			}
		}
	},
	computed:{
		updateWindowAll(){
			if(this.windowArea <= 0.1){
				this.resultValues.H = 0.8
			}else if(this.windowArea > 0.1 && this.windowArea < 0.21){
				this.resultValues.H = 0.9
			}else if(this.windowArea > 0.2 && this.windowArea < 0.31){
				this.resultValues.H = 1.0
			}else if(this.windowArea > 0.3 && this.windowArea < 0.41){
				this.resultValues.H = 1.1
			}else if(this.windowArea > 0.4){
				this.resultValues.H = 1.2
			}
			return this.resultValues.H;
		}	
	},
	mounted(){
		this.preload()

	},
	beforeUpdate(){
		this.updateWindowAll;
	}
})