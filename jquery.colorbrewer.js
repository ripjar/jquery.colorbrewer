;(function ( $ ) {

    var pluginName = "colorBrewer",
        defaults = {
            colors: colorbrewer,
            modal: true
        };

        // The actual plugin constructor
        function Plugin ( element, options ) {
          this.element = element;
          this.$el = $(element);
          this.settings = $.extend( {}, defaults, options );
          this._defaults = defaults;
          this._name = pluginName;
          this.$picker = $(this.settings.container);
          this.$preview = this.$el.parent().find(this.settings.preview);
          this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {

          init: function () {
              this.$el.addClass('colorbrewer');
              this.$picker.addClass('.colorbrewer-picker');
              this.populate();
              this.$el.on('click', $.proxy(this.show, this));
              this.events = {
                'click li': $.proxy(this.selectColor, this),
                'click .accept': $.proxy(this.accept, this),
                'click .cancel': $.proxy(this.cancel, this)
              }
          },

          delegateEvents: function () {
            var $picker = this.$picker;
            $.each(this.events, function (evt, action) {
              var e = evt.split(' ');
              $picker.on(e[0], e[1], action);
            });
            return this;
          },

          undelegateEvents: function () {
            var $picker = this.$picker;
            $.each(this.events, function (evt, action) {
              var e = evt.split(' ');
              $picker.off(e[0], e[1], action);
            })
            return this;
          },

          selectColor: function (e) {
            this.$picker.find('li.selected')
              .removeClass('selected');

            var color = $(e.currentTarget)
              .addClass('selected')
              .data('color');

            return this;
          },

          populate: function () {
            var self = this;
            var $target = this.settings.modal ? this.$picker.find('.modal-body') : this.$picker;
            // if colours are already in the modal, don't do it again
            if (!$target.find('.colors').length) {

              var $brew = $('<ul>')
                .addClass('colors brew')
                .appendTo($target);

              $.each(this.settings.colors, function (name, hex) {

                var $color = $('<li>')
                  .attr('data-color', hex)
                  .css('background-color', hex)
                  .appendTo($brew);

              });

            }
            return this.preview(this.$el.val());
          },

          preview: function (color) {
            this.$preview.css('background-color', color);
            return this;
          },

          hide: function () {
            if (this.settings.modal) {
              this.$picker.modal('hide');
            }
            else {
              this.$picker.hide();
            }
            this.undelegateEvents();
            return this;
          },

          accept: function () {
            var color = this.$picker
              .find('.selected')
              .data('color');
            this.$el
              .val(color)
              .change();
            return this.preview(color)
              .hide();
          },

          show: function () {
            this.oldValue = this.$el.val();
            if (this.settings.modal) {
              this.$picker.modal('show');
            }
            else {
              this.$picker.show();
            }
            this.$picker
              .find('.colors li')
              .removeClass('selected');
            this.$picker
              .find('[data-color="' + this.oldValue + '"]')
              .addClass('selected');
            this.delegateEvents();
            return this;
          },

          cancel: function () {
            this.$el.trigger('cancel');
            this.$el.val(this.oldValue);
            return this.hide();
          }

        });

        $.fn[ pluginName ] = function ( options ) {
                this.each(function() {
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });

                return this;
        };

})( jQuery );
