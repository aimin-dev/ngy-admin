import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeSelectorService } from './theme-selector.service';

// @dynamic
@Component({
    selector: 'ngx-api-admin-theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

    darkThemeToggle = new FormControl(false);
    @Input() color = 'primary';

    constructor(
        private themeSelector: ThemeSelectorService
    ) { }

    onToggleChange(): void {
        this.themeSelector.toggleDarkTheme();
    }

    ngOnInit(): void {
        this.themeSelector.enabled$.subscribe((enabled: boolean) => this.darkThemeToggle.setValue(enabled));
    }
}
