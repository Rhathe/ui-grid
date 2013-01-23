ngGridFlexibleHeightPlugin = function(opts) {
    var self = this;
    self.grid = null;
    self.scope = null;
    self.init = function(scope, grid, services) {
        self.grid = grid;
        self.scope = scope;
        var recalcHeightForData = function () { setTimeout(innerRecalcForData, 1); } ;
        var innerRecalcForData = function () {
            var rowCount = self.grid.sortedData.length;
            var gridId = self.grid.gridId;
            var topPanelSel = '.' + gridId + ' .ngTopPanel';
            var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
            var canvasSel = '.' + gridId + ' .ngCanvas';
            var viewportSel = '.' + gridId + ' .ngViewport';
            var extraHeight = $(topPanelSel).height() + $(footerPanelSel).height();
            var naturalHeight = $(canvasSel).height();
            if ($(viewportSel).height() > naturalHeight ) {
                if (opts != null) {
                    if (opts.minHeight != null && (naturalHeight + extraHeight) < opts.minHeight) {
                        naturalHeight = opts.minHeight - extraHeight - 2;
                    }
                }
                $(viewportSel).css('height', (naturalHeight + 2) + 'px');
                $('.' + gridId).css('height', (naturalHeight + extraHeight + 2) + 'px');
            }
            self.grid.refreshDomSizes();
        };
        scope.$watch (grid.config.data, recalcHeightForData);
    };
};
