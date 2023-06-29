<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread: 面包屑,带有x的小标签-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">x</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="removeTradeMark">x</i></li>
            <!-- 商品属性的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{ attrValue.split(":")[1]
            }}<i @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-xiangshangjiantoucuxiao': isAsc, 'icon-xiangxiajiantoucuxiao': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont"
                      :class="isAsc ? 'icon-xiangshangjiantoucuxiao' : 'icon-xiangxiajiantoucuxiao'"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="{name:'detail',params:{ skuid:good.id}}">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price"> 
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
            @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      //搜索时所带参数
      searchParams: {
        //一级分类id
        "category1Id": "",
        //二级分类id
        "category2Id": "",
        //三级分类id
        "category3Id": "",
        //分类名称
        "categoryName": "",
        //关键字
        "keyword": "",
        //排序,值格式: 1:综合,2:价格 asc:升序,desc:降序 示例:"1:desc"(默认值)
        "order": "2:desc",
        //分页器用的,代表的是当前是第几页
        "pageNo": 1,
        //代表的是每一页展示商品的个数
        "pageSize": 10,
        //商品属性,数组元素格式: "属性ID:属性值:属性名"
        "props": [],
        //品牌,值格式: "ID: 品牌名称"
        "trademark": ""
      },

    }
  },
  components: {
    SearchSelector
  },
  computed: {
    //商品列表
    ...mapGetters('search', ['goodsList', 'total']),
    //要展示的商品总数
    // ...mapState('search', ),

    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },

    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    }
  },
  methods: {
    //由于向服务器请求search数据要进行多次,且要根据参数不同返回不同的数据,所以将派发action请求search数据封装为一个函数.
    getData() {
      this.$store.dispatch('search/getSearchList', this.searchParams);
    },

    //点击删除分类面包屑,将searchParams参数中跟分类有关的参数置空,然后重新发起请求
    removeCategoryName() {
      //将searchParams参数变为undefined,则这个参数不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //路由重新跳转至search,并且携带原来的params参数,watch监视到路由发生变化会自动重新发起请求
      //这样既可以将信息展示到URL上,还可以重新发起请求
      this.$router.push({ name: 'search', params: this.$route.params })
    },

    //点击删除关键字面包屑,将searchParams参数中跟关键字有关的参数(keyword)置空,然后重新发起请求
    removeKeyword() {
      this.searchParams.keyword = undefined;
      //路由重新跳转至search,并且携带原来的query参数,watch监视到路由发生变化会自动重新发起请求
      this.$router.push({ name: 'search', query: this.$route.query });
      //通知兄弟组件Header清空搜索框
      this.$bus.$emit('clear');
    },

    //自定义事件trademarkInfo(品牌)的回调函数
    trademarkInfo(trademark) {
      //将子组件传入的品牌信息合并进SearchParams中
      //品牌, 值格式: "ID: 品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //合并参数后重新发起请求
      this.getData();
    },

    //点击删除品牌面包屑,将searchParams参数中跟品牌有关的参数(trademark)置空,然后重新发起请求
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      //重新发起请求
      //不能使用重新跳转至Search组件,然后watch监听到变化自动重新发起请求的原因:路由的params和query参数中都不包含分类
      this.getData();
    },

    //自定义事件attrInfo(商品属性)的回调函数
    attrInfo(attr, attrValue) {
      //将子组件传入的信息合并进SearchParams中
      //商品属性,数组元素格式: "属性ID:属性值:属性名"
      //先将数组元素的格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //然后在searchParams的props数组中追加此元素
      //如果已经存在此商品属性的面包屑了(已经点击过此商品属性了),则不会将此商品属性追加到props中
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      //合并参数后重新发起请求
      this.getData();
    },

    //点击删除商品属性面包屑,将searchParams参数中跟目标商品属性有关的参数从props中剔除,然后重新发起请求
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      //重新发起请求
      //不能使用重新跳转至Search组件,然后watch监听到变化自动重新发起请求的原因:路由的params和query参数中都不包含商品属性
      this.getData();
    },

    //点击修改排序方式或者升降序
    changeOrder(flag) {
      //flag形参用来指示用户点击的是哪个按钮 1:综合,2:价格

      //未点击之前order中的排序方式和升降序
      let originFlag = this.searchParams.order.split(':')[0];
      let originSort = this.searchParams.order.split(':')[1]

      //逻辑:如果点击的按钮与order现存的按钮不同,则将order中按钮改变为用户点击的按钮;
      //如果点击的按钮与order现存的按钮相同,则改变order中此按钮的升降序
      if (flag == originFlag) {
        this.searchParams.order = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`;
      } else {
        this.searchParams.order = `${flag}:desc`;
      }
      //改写完order后重新发起请求
      this.getData();
    },

    //获取分页器被点击的页码
    getPageNo(pageNo) {
      //改写pageNo
      this.searchParams.pageNo = pageNo;
      //重新发请求
      this.getData();
    }

  },
  watch: {
    //当路由的路径保持不变,只有params或query参数发生改变时,RUL会发生改变,但是并不会重新加载这个路由组件
    //所以要监听Search组件的路由信息的变化, 并对变化做出响应
    $route() {
      //合并参数之前先将searchParams的三个id清空,因为有的三级联动链接没有某个id,点击时有可能会携带上一个的某个id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //params或query参数发生改变后,重新将参数合并至searchParams对象
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //合并参数之后重新发起请求
      this.getData();
    }
  },
  beforeMount() {
    //在组件挂载完毕之前根据跳转至Search组件时携带的query和params参数改写请求数据时携带的参数searchParams
    // //复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword
    //Object.assign():ES6新增语法,用于合并对象,用后面对象的属性替换第一个对象的同名属性
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    //在组件挂载完毕之后发送请求,返回的数据由请求时所携带的参数决定,当所有参数都为空或undefined时,默认返回手机商品数据
    this.getData();
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>