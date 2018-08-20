<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots" v-if="isdots">
    	<span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex == index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from '../../common/js/dom.js'
import { setTimeout } from 'timers';
  export default{
  	data(){
  		return {
  			dots:[],
  			currentPageIndex:0
  		}
  	},
  	props:{
  		loop:{
  			type:Boolean,
  			default:true
  		},
  		autoPlay:{
  			type:Boolean,
  			default:true
  		},
  		interval:{
  			type:Number,
  			default:1000
			},
			isdots:{
				type: Boolean,
				default: false
			}
  	},
  	created(){
			setTimeout(()=>{
				this._setSliderWidth()
					this._dots()
					this._initSlider()
					
					if(this.autoPlay){
						this._play()
					}
			},20)
			window.addEventListener('resize',()=>{
				if(!this.slider){
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
			})
  	},
  	methods:{
  		_setSliderWidth(isResize){
				this.children = this.$refs.sliderGroup.children

				let width=0
				let sliderWidth = this.$refs.slider.clientWidth
				for(let i=0;i<this.children.length;i++){
					let child = this.children[i]
					addClass(child,'slider-item')
					child.style.width = sliderWidth +'px'
					width+=sliderWidth;
				}
				if(this.loop && !isResize){
					width+=2*sliderWidth
				}
				this.$refs.sliderGroup.style.width = width+'px'
  		},
  		
  		_dots(){
  			this.dots = new Array(this.children.length)
  		},
  		_initSlider(){
  			this.slider = new BScroll(this.$refs.slider,{	
			 	click: true,
			  	scrollX: true,
			  	scrollY: false,
			  	momentum: false,
			  	snap: {
			    	loop: true,
			    	threshold: 0.3,
			    	speed: 400
			  	}
  			})
  			
  			this.slider.on('scrollEnd',()=>{
  				let PageIndex = this.slider.getCurrentPage().pageX;
				if(this.loop){
					PageIndex -=1
				}
  				this.currentPageIndex = PageIndex+1;
  				if(this.autoPlay){
  					this._play()
  				}
  			})
  			  this.slider.on('beforeScrollStart', () => {
		          if (this.autoPlay) {
		            clearTimeout(this.timer)
		          }
		        })
  		},
  		_play(){
			let PageIndex = this.currentPageIndex
			
			if(this.loop){
				PageIndex += 1
			}
			this.timer = setTimeout(()=>{
				this.slider.next(400)
			},this.interval)
  		}
  	},
  	// 什么时候会destroyed?
  	destroyed() {
    	console.log('destroyed --> 清理定时器')
    	clearTimeout(this.timer) // 有利于内存的释放
  	}
  }
</script>

<style lang="less">
  .slider{
  	min-height: 1px;
    .slider-group{
    	position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item{
      	float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a{
        	display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
          img{
	        	display: block;
	          width: 100%;
	        }
        }
      }
    }    
    .dots{
    	position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot{
      	display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
         &.active{
        	width: 20px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.8);
        }
      }
    }     
  } 
</style>